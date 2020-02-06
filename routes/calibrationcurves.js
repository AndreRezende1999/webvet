const express = require('express');
const firebase = require('firebase');
const router = express.Router();
const mongoose = require('mongodb');
const auth = require('./middleware/auth');
const Kit = require('../models/kit');
const Sample = require('../models/sample');
const regression = require('regression');
const Workmap = require('../models/Workmap');

const ToxinasSigla = ['AFLA', 'DON', 'OTA', 'T2', 'ZEA', 'FBS'];
const ToxinasFull = ['aflatoxina', 'deoxinivalenol', 'ocratoxina', 't2toxina', 'zearalenona', 'fumonisina'];

router.get('/', async function (req, res, next) {
  var mapas = new Array;
  var amostras_afla = new Array;
  let kit_afla_ativo = await Kit.getActiveAfla();

  async function calcular(toxinafull, toxinasigla) {

    var kit = await Kit.getActiveID(toxinasigla);
    if (kit !== null) {
      var mapas = [];
      var p_concentration = [];
      var p_absorvance = [];
      var resultado = {};

      //Parte responsável por pegar a concentracao e absorvancia settadas no kit ativo
      p_concentration[0] = kit.calibrators.P1.concentration;
      p_concentration[1] = kit.calibrators.P2.concentration;
      p_concentration[2] = kit.calibrators.P3.concentration;
      p_concentration[3] = kit.calibrators.P4.concentration;
      p_concentration[4] = kit.calibrators.P5.concentration;

      p_absorvance[0] = kit.calibrators.P1.absorbance;
      p_absorvance[1] = kit.calibrators.P2.absorbance;
      p_absorvance[2] = kit.calibrators.P3.absorbance;
      p_absorvance[3] = kit.calibrators.P4.absorbance;
      p_absorvance[4] = kit.calibrators.P5.absorbance;

      //parte responsável por pegar as amostras do kit, logo  através do kit ativo de afla pega na variável mapArray o id dos mapas que estão sendo utilizados naqueles kits
      mapas = await Workmap.getByIdArray(kit.mapArray);

      var samples_id = [];
      //Após ter os ids dos mapas de trabalho que estão sendo utilizados roda um for para percorrer todos os mapas e um for dentro desse para acessar todas as amostras em cada mapa
      for (let j = 0; j < mapas.length; j++)
        for (let i = 0; i < mapas[j].samplesArray.length; i++)
          samples_id.push(mapas[j].samplesArray[i]);

      amostras = await Sample.getActiveByIdArray(samples_id, toxinafull);

      var log_concentracao = [Math.log10(p_concentration[1]), Math.log10(p_concentration[2]), Math.log10(p_concentration[3]), Math.log10(p_concentration[4])]; //eixo x
      var b_b0 = [];
      var ln_b_b0 = [];

      for (var i = 0; i < 4; i++)
        b_b0[i] = p_absorvance[i + 1] / p_absorvance[0];


      for (var i = 0; i < b_b0.length; i++)
        ln_b_b0[i] = Math.log10(b_b0[i] / (1 - b_b0[i]));

      const result = regression.linear([[log_concentracao[0], ln_b_b0[0]], [log_concentracao[1], ln_b_b0[1]], [log_concentracao[2], ln_b_b0[2]]]);
      const slope = result.equation[0];// slope
      const yIntercept = result.equation[1];// intercept

      resultado = {
        intercept: yIntercept,
        resultado: result.r2,
        slope: slope,
      };
    }
    return resultado;
  }

  var toxinas = {}

  for (let i = 0; i < toxinasSigla.length; i++) {
    const sigla = toxinasSigla[i];
    toxinas[i] = {
      name: sigla,
      calibradores: {},
      valores: calcular(ToxinasFull[i], ToxinasSigla[i])
    };    
  }

  for (i = 0; i < 6; i++) {
    for (j = 0; j < 5; j++) {
      console.log("Variaveis - i: " + i + " ; j: " + j + ". ");
      toxinas[i].calibradores[j] = { calname: "P" + (j + 1) };
      console.log(toxinas[i].calibradores[j].calname);
      if (i == 0) {
        toxinas[i].calibradores[j] = { concentracao: Aflaconcentration_p[j], absorvancia: Aflaabsorbance_p[j], calname: "P" + (j + 1) };
      } else if (i == 1) {
        toxinas[i].calibradores[j] = { concentracao: Deoxconcentration_p[j], absorvancia: DeoxAbsorbance_p[j], calname: "P" + (j + 1) };
      } else if (i == 2) {
        toxinas[i].calibradores[j] = { concentracao: Otaconcentration_p[j], absorvancia: OtaAbsorbance_p[j], calname: "P" + (j + 1) };
      } else if (i == 3) {
        toxinas[i].calibradores[j] = { concentracao: T2concentration_p[j], absorvancia: T2absorbance_p[j], calname: "P" + (j + 1) };
      } else if (i == 4) {
        toxinas[i].calibradores[j] = { concentracao: Zeaconcentration_p[j], absorvancia: ZeaAbsorbance_p[j], calname: "P" + (j + 1) };
      } else if (i == 5) {
        toxinas[i].calibradores[j] = { concentracao: Fbsconcentration_p[j], absorvancia: Fbsabsorbance_p[j], calname: "P" + (j + 1) };
      } else {
        console.log("Erro de tamanho de for");
      }
    }
  }

  console.log("Imprimir todas as toxinas: ");
  console.log(toxinas);

  console.log("Imprimir calibrador AFLA P2: ");
  console.log(toxinas[0].calibradores[1]);

  console.log("Imprimir todos calibradores de AFLA: ");
  console.log(toxinas[0].calibradores);

  console.log("Imprimir numero do calibrador P1 de AFLA: ");
  console.log(toxinas[0].calibradores[0].calname);

  console.log("Imprimir numero de absorvancia do calibrador P1 de AFLA: ");
  console.log(toxinas[0].calibradores[0].absorvancia);

  console.log("Imprimir valor do resultado do calibrador 1 de AFLA")
  console.log(toxinas[0].valores.resultado);

  console.log("Tipo")
  console.log(typeof toxinas[0].valores.resultado);
  res.render('calibrationcurves', { title: 'Curvas de Calibração', toxinas });
})


module.exports = router;
