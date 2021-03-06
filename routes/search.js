const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const mongoose = require('mongodb');
const auth = require('./middleware/auth');
const User = require('../models/user');
const Sample = require('../models/sample');
const Kit = require('../models/kit');
const Requisition = require('../models/requisition');
const Workmap = require('../models/Workmap');
const Covenant = require('../models/covenant');

router.get('/producers', auth.isAuthenticated, (req, res) => {
  async function getProducers() {
    try {
      return (await User.getAllActiveProducers())
    } catch (error) {
      console.log(error);
      res.redirect('/error');
    }
  }
  const producers = getProducers();
  res.send(producers);
});

router.get('/covenants', auth.isAuthenticated, (req, res) => {
  async function getCovenants() {
    try {
      return (await Covenant.getAll());
    } catch (error) {
      console.log(error);
      res.redirect('/error');
    }
  }
  const covenants = getCovenants();
  res.send(covenants);
});

router.get('/managers', auth.isAuthenticated, (req, res) => {
  async function getManagers() {
    try {
      return (await User.getAllActiveManagers());
    } catch (error) {
      console.log(error);
      res.redirect('/error');
    }
  }
  const managers = getManagers();
  res.send(managers);
});

router.get('/samples', auth.isAuthenticated, (req, res) => {
  Sample.getAll().then((samples) => {
    res.send(samples);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/samplesActive', auth.isAuthenticated, (req, res) => {
  Sample.getAllActive().then((samples) => {
    res.send(samples);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/samplesActiveWithUser', auth.isAuthenticated, (req, res) => {
  Sample.getAllActiveWithUser().then((objs) => {
    res.send(objs);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/userFromSample/:sampleID', auth.isAuthenticated, (req, res) => {
  Requisition.getBySampleID(req.params.sampleID).then((requisition) => {
    User.getById(requisition.user).then((user) => {
      res.send(user);
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });

  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/userFromRequisiton/:requisitonID', auth.isAuthenticated, (req, res) => {
  Requisition.getById(req.params.requisitonID).then((requisition) => {
    User.getById(requisition.user).then((user) => {
      res.send(user);
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/kits', auth.isAuthenticated, (req, res) => {
  Kit.getAll().then((kits) => {
    res.send(kits);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/kits/:toxinafull', auth.isAuthenticated, (req, res) => {

  let sigla = ToxinasSigla[ToxinasFull.indexOf(req.params.toxinafull)]

  //Correção provisória do problema com a sigla
  if (sigla === "FBS")
    sigla = "FUMO"

  Kit.getByProductCode(sigla + " Romer").then((kits) => {
    res.send(kits);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/kits/:toxinafull/:kittype', auth.isAuthenticated, (req, res) => {

  let sigla = ToxinasSigla[ToxinasFull.indexOf(req.params.toxinafull)]

  //Correção provisória do problema com a sigla
  if (sigla === "FBS")
    sigla = "FUMO"

  Kit.getByCustomQuery({
    productCode: sigla + " Romer",
    kitType: req.params.kittype,
  }).then((kits) => {
    res.send(kits);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/getKit/:kitid', auth.isAuthenticated, (req, res) => {
  Kit.getById(req.params.kitid).then((kit) => {
    res.send(kit);
  }).catch((error) => {
    res.redirect('/error');
  });
});

router.get('/getWorkmap/:workmapid', auth.isAuthenticated, (req, res) => {
  Workmap.getOneMap(req.params.workmapid).then((workmap) => {
    res.send(workmap);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/getOneSample/:sampleID', auth.isAuthenticated, (req, res) => {
  Sample.getById(req.params.sampleID).then((sample) => {
    res.send(sample);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/getSamplesActive/:toxin/:samples', auth.isAuthenticated, (req, res) => {
  let samples = req.params.samples.split(",");
  let toxin = req.params.toxin;
  let query = {}
  query[toxin][active] = true;

  Sample.getByIdArrayWithQuery(samples, query).then((res) => {
    res.send(res);
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.get('/getSamplesActiveByWorkmapArray/:mapidArray/:toxin', auth.isAuthenticated, (req, res) => {
  let workmapids = req.params.mapidArray.split(",");
  let toxin = req.params.toxin;
  Workmap.getByIdArray(workmapids).then(workmaps => {
    let samples = [];
    workmaps.forEach(workmap => {
      samples = samples.concat(workmap.samplesArray);
    });

    Sample.getActiveByIdArray(samples, toxin).then(samplesobj => {
      res.send(samplesobj);
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

module.exports = router;
