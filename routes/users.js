const express = require('express');
const firebase = require('firebase');
const router = express.Router();
const mongoose = require('mongodb');
const auth = require('./middleware/auth');
const User = require('../models/user');
const Email = require('../models/email');

/* GET home page. */
router.get('/', auth.isAuthenticated, function(req, res, next) {
  User.getAll().then((users) => {
    res.render('admin/users/index', { title: 'Usuários', layout: 'layoutDashboard.hbs', users, ...req.session });

  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/pending', auth.isAuthenticated, function(req, res, next) {

  User.getAll().then((users) => {
    //console.log(users);
    res.render('admin/users/pending', { title: 'Usuários pendentes', layout: 'layoutDashboard.hbs', users, ...req.session });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/associated', auth.isAuthenticated, function(req, res, next) {

  User.getAll().then((users) => {
    console.log(users);
    res.render('admin/users/associated', { title: 'Conveniados', layout: 'layoutDashboard.hbs', users, ...req.session });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/producers', auth.isAuthenticated, function(req, res, next) {

  User.getAll().then((users) => {
    console.log(users);
    res.render('admin/users/producers', { title: 'Produdores', layout: 'layoutDashboard.hbs', users, ...req.session });

  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/managers', auth.isAuthenticated, function(req, res, next) {

  User.getAll().then((users) => {
    const loggedID = req.session.user._id
    console.log(loggedID);
    res.render('admin/users/managers', { title: 'Gerentes', layout: 'layoutDashboard.hbs', users, ...req.session, loggedID });

  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/managers/:id', auth.isAuthenticated, function(req, res, next) {

  User.getAssociatedMaganersById(req.params.id).then((users) => {
    console.log(users);
    User.getById(req.params.id).then((user) => {
      console.log(user);
      res.render('admin/users/managers', { title: 'Gerentes Associados', layout: 'layoutDashboard.hbs', users, user, ...req.session });
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});


router.get('/producers/:id', auth.isAuthenticated, function(req, res, next) {

  User.getAssociatedProducersById(req.params.id).then((users) => {
    console.log(users);
    User.getById(req.params.id).then((user) => {
      console.log(user);
      res.render('admin/users/producers', { title: 'Produtores Associados', layout: 'layoutDashboard.hbs', users, user, ...req.session });
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.post('/edit/:id', auth.isAuthenticated, function(req, res, next) {
  const { user } = req.body;
  const promises = [];
  const producersId = [];

  req.body.producer.forEach((producerName) => {
    const regex = new RegExp(producerName, 'i');
    const promise = User.getOneByQuery({ name: regex });
    promises.push(promise);
  });

  Promise.all(promises).then((producers) => {
    producers.forEach((producer) => {
      producersId.push(producer.id);
    });

    user.associatedProducers = producersId;
    console.log (user.fullname);
    User.update(req.params.id, user).then(() => {
     req.flash('success', 'Usuário editado com sucesso.');
     res.redirect('/users/show/'+req.params.id);
    }).catch((error) => {
     console.log(error);
     res.redirect('/error');
    });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/show/:id', function(req, res, next) {
  User.getById(req.params.id).then((user) => {
    User.getAll().then((users) => {
      console.log(user);
      res.render('admin/users/show', { title: 'Perfil do usuário', layout: 'layoutDashboard.hbs', user, users, });
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.put('/approve/:id', auth.isAuthenticated, function(req, res, next) {
  User.getById(req.params.id).then((user) => {
    Email.userApprovedEmail(user).catch((error) => {
      req.flash('danger', 'Não foi possível enviar o email para o usuário aprovado.');
    });
  });
  const user = {
    status: 'Ativo'
  };
  User.update(req.params.id, user).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
  req.flash('success', 'Usuário aprovado com sucesso.');
  res.redirect('/users/pending');
});


router.put('/reject/:id', auth.isAuthenticated, function(req, res, next) {
  User.getById(req.params.id).then((user) => {
    Email.userRejectedEmail(user).catch((error) => {
      req.flash('danger', 'Não foi possível enviar o email para o usuário rejeitado.');
    });
  });
  const user = {
    status: 'Bloqueado'
  };
  User.update(req.params.id, user).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
  req.flash('success', 'Usuário bloqueado com sucesso.');
  res.redirect('/users/pending');
  });

router.put('/block/:id', auth.isAuthenticated, function(req, res, next) {
  User.getById(req.params.id).then((user) => {
    Email.userRejectedEmail(user).catch((error) => {
      req.flash('danger', 'Não foi possível enviar o email para o usuário rejeitado.');
    });
  });

  User.delete(req.params.id).then(() => {
    req.flash('success', 'Usuário deletado com sucesso.');
    res.redirect('/users/pending');
  }).catch((error) => {
    res.redirect('/error');
  });
});


router.get('/addManager', auth.isAuthenticated,  function(req, res, next) {
  User.getById("5ce8401566fee16478f3f43a").then((manager) => {
    // Adiciona o segundo id ao primeiro
    User.addManager("5ce8401566fee16478f3f43a", "5ce83ed566fee16478f3f435").catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
    res.render('', { title: 'Usuários', layout: 'layoutDashboard.hbs' });
  });
});

router.put('/approvepayment/:id', auth.isAuthenticated, function(req, res, next) {
  User.getById(req.params.id).then((user) => {
    if (user.debt) {
      const user2 = {
        debt: false
      };
      User.update(req.params.id, user2).then(()=>{
        req.flash('success', 'Pagamento aprovado com sucesso.');
        res.redirect('/users');
      }).catch((error) => {
        console.log(error);
        res.redirect('/error');
      });
      } else {
      const user2 = {
        debt: true
      };
      User.update(req.params.id, user2).then(()=>{
        req.flash('success', 'Pagamento aprovado com sucesso.');
        res.redirect('/users');
      }).catch((error) => {
          console.log(error);
          res.redirect('/error');
      });
    }
  }).catch((error) => {
    res.redirect('/error');
    console.log(error);
  });
});


module.exports = router;
