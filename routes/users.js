const express = require('express');
var admin = require('firebase-admin');
const router = express.Router();
const auth = require('./middleware/auth');
const User = require('../models/user');
const Email = require('../models/email');

/* GET home page. */
router.get('/', auth.isAuthenticated, function (req, res) {
  User.getAllActiveProducers().then((users) => {
    res.render('admin/users/index', { title: 'Usuários', layout: 'layoutDashboard.hbs', users, ...req.session });

  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/pending', auth.isAuthenticated, function (req, res) {

  User.getPendingAndInactive().then((result) => {
    let [obj1, obj2] = result;

    let inactives;
    let pending;

    if (obj1) {
      if (obj1._id == "Inativo")
        inactives = obj1.users;
      else
        pending = obj1.users;
    }

    if (obj2) {
      if (obj2._id == "Inativo")
        inactives = obj2.users;
      else
        pending = obj2.users;
    }

    res.render('admin/users/pending', { title: 'Usuários pendentes', layout: 'layoutDashboard.hbs', inactives, pending, ...req.session });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/associated', auth.isAuthenticated, function (req, res) {

  User.getAll().then((users) => {
    res.render('admin/users/associated', { title: 'Conveniados', layout: 'layoutDashboard.hbs', users, ...req.session });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/analysts', auth.isAuthenticated, function (req, res) {

  User.getByQuery({ type: "Analista" }).then((users) => {
    console.log(users);
    res.render('admin/users/analysts', { title: 'Produdores', layout: 'layoutDashboard.hbs', users, ...req.session });

  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/producers', auth.isAuthenticated, function (req, res) {

  User.getAll().then((users) => {
    res.render('admin/users/producers', { title: 'Produdores', layout: 'layoutDashboard.hbs', users, ...req.session });

  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/managers', auth.isAuthenticated, function (req, res) {

  User.getByQuery({type: "Gerencia"}).then((users) => {
    const loggedID = req.session.user._id
    res.render('admin/users/managers', { title: 'Gerentes', layout: 'layoutDashboard.hbs', users, ...req.session, loggedID });

  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/managers/:id', auth.isAuthenticated, function (req, res) {

  User.getAssociatedMaganersById(req.params.id).then((users) => {
    User.getById(req.params.id).then((user) => {
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


router.get('/producers/:id', auth.isAuthenticated, function (req, res) {

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
router.post('/edit/:id', auth.isAuthenticated, function (req, res) {
  const { user } = req.body;
  const promises = [];
  const producersId = [];

  Promise.all(promises).then((producers) => {
    producers.forEach((producer) => {
      producersId.push(producer.id);
    });
    user.associatedProducers = producersId;
    User.update(req.params.id, user).then(() => {
      req.flash('success', 'Usuário editado com sucesso.');
      res.redirect('/users/show/' + req.params.id);
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });

});

router.get('/show/:id/:returnRoute', function (req, res) {
  User.getById(req.params.id).then((actualUser) => {
    res.render('admin/users/show', { title: 'Perfil do usuário', layout: 'layoutDashboard.hbs', returnRoute: req.params.returnRoute, actualUser, ...req.session });
  }).catch((error) => {
    console.log(error);
    res.redirect('/error');
  });
});

router.post('/approve/:id', auth.isAuthenticated, auth.isFromLab, function (req, res) {
  User.getById(req.params.id).then((user) => {
    Email.userApprovedEmail(user.email, user.fullname.split(' ')[0]).catch((error) => {
      req.flash('danger', 'Não foi possível enviar o email para o usuário aprovado.');
    });
  });

  const user = {
    status: 'Ativo'
  };

  User.update(req.params.id, user).catch((error) => {
    console.log(error);
    res.redirect('/error');
  }).then(() => {
    req.flash('success', 'Usuário aprovado com sucesso.');
    res.redirect('/users/pending');
  });
});


router.post('/pending/:id', auth.isAuthenticated, function (req, res) {

  const user = {
    status: 'Aguardando aprovação'
  };

  User.update(req.params.id, user).catch((error) => {
    console.log(error);
    res.redirect('/error');
  }).then(() => {
    req.flash('success', 'Usuário ativado com sucesso.');
    res.redirect('/users/pending');
  });
});

router.post('/reject/:id', auth.isAuthenticated, function (req, res) {
  User.getById(req.params.id).then((user) => {
    Email.userRejectedEmail(user.email, user.fullname).catch((error) => {
      req.flash('danger', 'Não foi possível enviar o email para o usuário rejeitado.');
    });
  });
  const user = {
    status: 'Inativo'
  };
  User.update(req.params.id, user).catch((error) => {
    console.log(error);
    res.redirect('/error');
  }).then(() => {
    req.flash('success', 'Usuário Inativado com sucesso.');
    res.redirect('/users/pending');
  });
});

router.post('/block/:id', auth.isAuthenticated, function (req, res) {
  User.getById(req.params.id).then((user) => {
    admin.auth().deleteUser(user.uid).then(function () {

      Email.userRejectedEmail(user.email, user.fullname).catch((error) => {
        req.flash('danger', 'Não foi possível enviar o email para o usuário rejeitado.');
      });

      User.delete(req.params.id).then(() => {
        req.flash('success', 'Usuário deletado com sucesso.');
        res.redirect('/users/pending');
      }).catch((error) => {
        res.redirect('/users/pending');
      });

    }).catch(function (error) {
      console.log('Error deleting user:', error);
      req.flash('danger', 'Error deleting user');
      res.redirect('/users/pending');
    });;

  });

});

router.post('/approvepayment/:id', auth.isAuthenticated, function (req, res) {
  User.getById(req.params.id).then((user) => {

    const userUpdate = {
      debt: !user.debt,
    };

    let text = userUpdate.debt ? 'Pagamento reprovado com sucesso.' : 'Pagamento aprovado com sucesso.';
    let type = userUpdate.debt ? 'danger' : 'success';

    User.update(req.params.id, userUpdate).then(() => {
      req.flash(type, text);
      res.redirect('/users');
    }).catch((error) => {
      console.log(error);
      res.redirect('/error');
    });
  }).catch((error) => {
    res.redirect('/error');
    console.log(error);
  });
});


module.exports = router;
