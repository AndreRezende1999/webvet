var aflatoxina = new jKanban({
  element : '#aflatoxina',
  gutter  : '10px',
  widthBoard  : '190px',
  click : function(el) {
    window.location.href = 'sample/edit/' + el.dataset.eid;
  },
  boards  : [
    {
      id : '_testing',
      title  : 'Em análise',
      class : 'success',
    },
    {
      id : '_ownering',
      title  : 'Aguardando pagamento',
      class : 'success',
    },
    {
      id : '_waiting',
      title  : 'Aguardando amostra',
      class : 'info',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;

    if  (target == '_testing') {
      $.post('/sample/testing/edit/aflatoxina/' + samplenumber, () => {

      });

      if(el.dataset.eid=="owner") {
        el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>'+ " "+'<span  class="badge badge-danger">' + el.dataset.owner + '</span>';
      }
      else {
        el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

      }

    }
    if  (target == '_ownering') {
      $.post('/sample/ownering/edit/aflatoxina/' + samplenumber, () => {

      });
      if(el.dataset.eid=="owner") {
        el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>'+ " "+'<span  class="badge badge-danger">' + el.dataset.owner + '</span>';
      }
      else {
        el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando pagamento' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';


      }

    }
    if  (target == '_waiting') {
      $.post('/sample/waiting/edit/aflatoxina/' + samplenumber, () => {

      });

      if(el.dataset.eid=="owner") {
        el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>'+ " "+'<span  class="badge badge-danger">' + el.dataset.owner + '</span>';
      }
      else{
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando amostra' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';
       }
    }



  }
});




var scndAflatoxina = new jKanban({
  element : '#afla2toxina',
  gutter  : '10px',
  widthBoard  : '165px',
  click : function(el) {
    window.location.href = 'sample/edit/' + el.dataset.eid;
  },
  boards  : [
    {
      id : '_scndTesting',
      title  : 'Em análise',
      class : 'info'
    },
    {
      id : '_calibrator',
      title  : 'Calibradores',
      class : 'success',
      item: [
          {
            title:'P1',
            id: 'P1'
          },

          {
            title:'P2',
            id: 'P2'
          },

          {
            title:'P3',
            id: 'P3'
          },

          {
            title:'P4',
            id: 'P4'
          },

          {
            title:'P5',
            id: 'P5'
          }
      ]
    },
    {
      id : '_workmap1',
      title  : 'Mapa de trabalho 1',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;
    var goTO=target;
    console.log(goTO);
    if(target =='_calibrator'){
        var strId=el.dataset.eid; //id do card
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem
               return false
         }
         else if( strId.indexOf("child")!=-1){ //basicamente todo elemento que contenha child no id
           var id=el.dataset.eid;
           scndAflatoxina.removeElement(id);
        } else {
          return false // impede outros cards de entrarem no board dos calibradores

        }
    }

    if( goTO.indexOf("workmap")!=-1) { //se o alvo for um board workmap qualquer
        var calibrator=el.dataset.eid;
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards originais

              var sonNumber=IdAflaCount(); //essa função gera os id dos childs dos cards, para que estes naa tenham msm id
              var mapName=goTO.toString();


              scndAflatoxina.addElementStandart( goTO,
               {  id: el.dataset.eid +'child'+ sonNumber.toString(),
                  title: el.dataset.eid,

               });


          //     $.post('/sample/addPOnMap/aflatoxina/'+nowAflaKit+'/'+mapName+'/'+calibrator,  () => {

            //   });


           return false; // um card chil é criado no board alvo, mas o original retorna aos calibradores

        } else if (calibrator.indexOf("child")!=-1) {

              return false;
        }

        else {
          // $.post('/sample/mapwork/edit/aflatoxina/' + samplenumber+'/'+goTO, () => {
          //
          // });
          var mapName=goTO.toString();

          $.post('/sample/mapedit/aflatoxina/' + samplenumber+'/'+nowAflaKit+'/'+mapName,  () => {

          });
          el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

      }
    }

    if(target=='_scndTesting') {
      var calibrator=el.dataset.eid;
      if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem para em analise
             return false

       } else if (calibrator.indexOf("child")!=-1) {

             return false;
       }
       else {
         $.post('/sample/scndTesting/edit/aflatoxina/' + samplenumber+'/'+nowAflaKit, () => {

         });
         el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

       }
    }


  }
});

var countAfla=0;

function IdAflaCount ()
{
  console.log("count Afla is: " + countAfla);
    countAfla++;
    return countAfla;
}



const deoxinivalenol = new jKanban({
  element : '#deoxinivalenol',
  gutter  : '10px',
  widthBoard  : '190px',
  click : function(el) {
    alert(el.innerHTML);
    alert(el.dataset.eid)
  },
  boards  : [
    {
      id : '_testing',
      title  : 'Em análise',
      class : 'success',
    },
    {
      id : '_ownering',
      title  : 'Aguardando pagamento',
      class : 'success',
    },
    {
      id : '_waiting',
      title  : 'Aguardando amostra',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;

    if  (target == '_testing') {
      $.post('/sample/testing/edit/deoxinivalenol/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_ownering') {
      $.post('/sample/ownering/edit/deoxinivalenol/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando pagamento' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_waiting') {
      $.post('/sample/waiting/edit/deoxinivalenol/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando amostra' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }

    if  (target == '_workmap') {
      $.post('/sample/mapwork/edit/deoxinivalenol/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }



  }
});

var scndDeoxinivalenol = new jKanban({
  element : '#deoxini2valenol',
  gutter  : '10px',
  widthBoard  : '165px',
  click : function(el) {
    window.location.href = 'sample/edit/' + el.dataset.eid;
  },
  boards  : [
    {
      id : '_scndTesting',
      title  : 'Em análise',
      class : 'info'
    },
    {
      id : '_calibrator',
      title  : 'Calibradores',
      class : 'success',
      item: [
          {
            title:'P1',
            id: 'P1'
          },

          {
            title:'P2',
            id: 'P2'
          },

          {
            title:'P3',
            id: 'P3'
          },

          {
            title:'P4',
            id: 'P4'
          },

          {
           title:'P5',
           id: 'P5'
          }
      ]
    },
    {
      id : '_workmap1',
      title  : 'Mapa de trabalho 1',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;
    var goTO=target;
    console.log(goTO);
    if(target =='_calibrator'){
        var strId=el.dataset.eid; //id do card
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem
               return false
         }
         else if( strId.indexOf("child")!=-1){ //basicamente todo elemento que contenha child no id
           var id=el.dataset.eid;
           scndDeoxinivalenol.removeElement(id);
        } else {
          return false // impede outros cards de entrarem no board dos calibradores
        }
    }

    if( goTO.indexOf("workmap")!=-1) { //se o alvo for um board workmap qualquer
        var calibrator=el.dataset.eid;
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards originais

              var sonNumber=IdDeoxCount(); //essa função gera os id dos childs dos cards, para que estes naa tenham msm id
              scndDeoxinivalenol.addElementStandart( goTO,
               {  id: el.dataset.eid +'child'+ sonNumber.toString(),
                  title: el.dataset.eid,

               });

           return false; // um card chil é criado no board alvo, mas o original retorna aos calibradores
         } else if (calibrator.indexOf("child")!=-1) {

               return false;


        } else {
          var mapName=goTO.toString();

          $.post('/sample/mapedit/deoxinivalenol/' + samplenumber+'/'+nowDeoxKit+'/'+mapName,  () => {

          });
          el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

     }

   }

    if(target=='_scndTesting') {
        var calibrator=el.dataset.eid;
      if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem para em analise
             return false;
       }
       else if (calibrator.indexOf("child")!=-1) {

             return false;
       }
       else {
      $.post('/sample/scndTesting/edit/deoxinivalenol/' + samplenumber+'/'+nowDeoxKit, () => {

         });
         el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

       }
    }


   }

});

//função de criação dos id dos Pchild para o scndDeoxinivalenol
var countDeox=0;

function IdDeoxCount ()
{
  console.log("count Deox is: " + countDeox);
    countDeox++;
    return countDeox;
}




const ocratoxina = new jKanban({
  element : '#ocratoxina',
  gutter  : '10px',
  widthBoard  : '190px',
  boards  : [
    {
      id : '_testing',
      title  : 'Em análise',
      class : 'success',
    },
    {
      id : '_ownering',
      title  : 'Aguardando pagamento',
      class : 'success',
    },
    {
      id : '_waiting',
      title  : 'Aguardando amostra',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;

    if  (target == '_testing') {
      $.post('/sample/testing/edit/ocratoxina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_ownering') {
      $.post('/sample/ownering/edit/ocratoxina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando pagamento' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_waiting') {
      $.post('/sample/waiting/edit/ocratoxina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando amostra' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }

    if  (target == '_workmap') {
      $.post('/sample/mapwork/edit/ocratoxina/' + samplenumber, () => {


      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }

  }
});

var scndOcratoxina = new jKanban({
  element : '#ocra2toxina',
  gutter  : '10px',
  widthBoard  : '165px',
  click : function(el) {
    window.location.href = 'sample/edit/' + el.dataset.eid;
  },
  boards  : [
    {
      id : '_scndTesting',
      title  : 'Em análise',
      class : 'info'
    },
    {
      id : '_calibrator',
      title  : 'Calibradores',
      class : 'success',
      item: [
          {
            title:'P1',
            id: 'P1'
          },

          {
            title:'P2',
            id: 'P2'
          },

          {
            title:'P3',
            id: 'P3'
          },

          {
            title:'P4',
            id: 'P4'
          },
          {
            title:'P5',
            id: 'P5'
          }
      ]
    },
    {
      id : '_workmap1',
      title  : 'Mapa de trabalho 1',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;
    var goTO=target;
    console.log(goTO);
    if(target =='_calibrator'){
        var strId=el.dataset.eid; //id do card
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem
               return false
         }
         else if( strId.indexOf("child")!=-1){ //basicamente todo elemento que contenha child no id
           var id=el.dataset.eid;
           scndOcratoxina.removeElement(id);
        } else {
          return false // impede outros cards de entrarem no board dos calibradores
        }
    }

    if( goTO.indexOf("workmap")!=-1) { //se o alvo for um board workmap qualquer
       var calibrator=el.dataset.eid;
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards originais

              var sonNumber=IdOcraCount(); //essa função gera os id dos childs dos cards, para que estes naa tenham msm id
              scndOcratoxina.addElementStandart( goTO,
               {  id: el.dataset.eid +'child'+ sonNumber.toString(),
                  title: el.dataset.eid,

               });

           return false; // um card chil é criado no board alvo, mas o original retorna aos calibradores

        }   else if (calibrator.indexOf("child")!=-1) {

               return false;


        } else {
          var mapName=goTO.toString();


          $.post('/sample/mapedit/ocratoxina/' + samplenumber+'/'+nowOcraKit+'/'+mapName,  () => {

          });
          el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

      }
    }

    if(target=='_scndTesting') {
      var calibrator=el.dataset.eid;
      if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem para em analise
             return false
       }
       else if (calibrator.indexOf("child")!=-1) {

             return false;
       }
       else {
       $.post('/sample/scndTesting/edit/ocratoxina/' +samplenumber+'/'+nowOcraKit, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
  }

 }
});

//função de criação dos id dos Pchild para o scndOcratoxina
var countOcra = 0;

function IdOcraCount (){
  console.log("count Ocra is: " + countOcra);
    countOcra++;
    return countOcra;
}




const t2toxina = new jKanban({
  element : '#t2toxina',
  gutter  : '10px',
  widthBoard  : '190px',
  boards  : [
    {
      id : '_testing',
      title  : 'Em análise',
      class : 'success',
    },
    {
      id : '_ownering',
      title  : 'Aguardando pagamento',
      class : 'success',
    },
    {
      id : '_waiting',
      title  : 'Aguardando amostra',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;

    if  (target == '_testing') {
      $.post('/sample/testing/edit/t2toxina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_ownering') {
      $.post('/sample/ownering/edit/t2toxina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando pagamento' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_waiting') {
      $.post('/sample/waiting/edit/t2toxina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando amostra' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }

    if  (target == '_workmap') {
      $.post('/sample/mapwork/edit/t2toxina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
  }
});

var scndT2toxina = new jKanban({
  element : '#t22toxina',
  gutter  : '10px',
  widthBoard  : '165px',
  click : function(el) {
    window.location.href = 'sample/edit/' + el.dataset.eid;
  },
  boards  : [
    {
      id : '_scndTesting',
      title  : 'Em análise',
      class : 'info'
    },
    {
      id : '_calibrator',
      title  : 'Calibradores',
      class : 'success',
      item: [
          {
            title:'P1',
            id: 'P1'
          },

          {
            title:'P2',
            id: 'P2'
          },

          {
            title:'P3',
            id: 'P3'
          },

          {
            title:'P4',
            id: 'P4'
          },
          {
            title:'P5',
            id: 'P5'
          }
      ]
    },
    {
      id : '_workmap1',
      title  : 'Mapa de trabalho 1',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;
    var goTO=target;
    console.log(goTO);
    if(target =='_calibrator'){
        var strId=el.dataset.eid; //id do card
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem
               return false
         }
         else if( strId.indexOf("child")!=-1){ //basicamente todo elemento que contenha child no id
           var id=el.dataset.eid;
           scndT2toxina.removeElement(id);
        } else {
          return false // impede outros cards de entrarem no board dos calibradores
        }
    }

    if( goTO.indexOf("workmap")!=-1) { //se o alvo for um board workmap qualquer
        var calibrator=el.dataset.eid;
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards originais

              var sonNumber=IdT2Count(); //essa função gera os id dos childs dos cards, para que estes naa tenham msm id
              scndT2toxina.addElementStandart( goTO,
               {  id: el.dataset.eid +'child'+ sonNumber.toString(),
                  title: el.dataset.eid,

               });

           return false; // um card chil é criado no board alvo, mas o original retorna aos calibradores

         }   else if (calibrator.indexOf("child")) {

                return false;


         } else {
          var mapName=goTO.toString();

          $.post('/sample/mapedit/t2toxina/' + samplenumber+'/'+nowT2Kit+'/'+mapName,  () => {

          });
          el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

      }
    }

    if(target=='_scndTesting') {
        var calibrator=el.dataset.eid;
      if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem para em analise
             return false
       }
       else if (calibrator.indexOf("child")!=-1) {

             return false;
       }
       else {
         $.post('/sample/scndTesting/edit/t2toxina/' + samplenumber+'/'+nowT2Kit, () => {

         });
         el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

       }
    }


  }
});

//função de criação dos id dos Pchild para o T2 toxina
var countT2=0;

function IdT2Count ()
{
  console.log("count T2 is: " + countT2);
    countT2++;0
    return countT2;
}


var t2Limit;



const fumonisina = new jKanban({
  element : '#fumonisina',
  gutter  : '10px',
  widthBoard  : '190px',
  boards  : [
    {
      id : '_testing',
      title  : 'Em análise',
      class : 'success',
    },
    {
      id : '_ownering',
      title  : 'Aguardando pagamento',
      class : 'success',
    },
    {
      id : '_waiting',
      title  : 'Aguardando amostra',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;

    if  (target == '_testing') {
      $.post('/sample/testing/edit/fumonisina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_ownering') {
      $.post('/sample/ownering/edit/fumonisina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando pagamento' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_waiting') {
      $.post('/sample/waiting/edit/fumonisina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando amostra' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }

    if  (target == '_workmap') {
      $.post('/sample/mapwork/edit/fumonisina/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
  }
});


var scndFumonisina = new jKanban({
  element : '#fumonisina2',
  gutter  : '10px',
  widthBoard  : '165px',
  click : function(el) {
    window.location.href = 'sample/edit/' + el.dataset.eid;
  },
  boards  : [
    {
      id : '_scndTesting',
      title  : 'Em análise',
      class : 'info'
    },
    {
      id : '_calibrator',
      title  : 'Calibradores',
      class : 'success',
      item: [
          {
            title:'P1',
            id: 'P1'
          },

          {
            title:'P2',
            id: 'P2'
          },

          {
            title:'P3',
            id: 'P3'
          },

          {
            title:'P4',
            id: 'P4'
          },
          {
            title:'P5',
            id: 'P5'
          }
      ]
    },
    {
      id : '_workmap1',
      title  : 'Mapa de trabalho 1',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;
    var goTO=target;
    console.log(goTO);
    if(target =='_calibrator'){
        var strId=el.dataset.eid; //id do card
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem
               return false
         }
         else if( strId.indexOf("child")!=-1){ //basicamente todo elemento que contenha child no id
           var id=el.dataset.eid;
           scndFumonisina.removeElement(id);
        } else {
          return false // impede outros cards de entrarem no board dos calibradores
        }
    }

    if( goTO.indexOf("workmap")!=-1) { //se o alvo for um board workmap qualquer
        var calibrator=el.dataset.eid
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards originais

              var sonNumber=IdFumCount(); //essa função gera os id dos childs dos cards, para que estes naa tenham msm id
              scndFumonisina.addElementStandart( goTO,
               {  id: el.dataset.eid +'child'+ sonNumber.toString(),
                  title: el.dataset.eid,

               });

           return false; // um card chil é criado no board alvo, mas o original retorna aos calibradores

         }   else if (calibrator.indexOf("child")!=-1) {

                return false;


         } else {
          var mapName=goTO.toString();


          $.post('/sample/mapedit/fumonisina/' + samplenumber+'/'+nowFumKit+'/'+mapName,  () => {

          });
          el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

      }
    }

    if(target=='_scndTesting') {
        var calibrator=el.dataset.eid;
      if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem para em analise
             return false
       }

       else if (calibrator.indexOf("child")!=-1) {

             return false;
       }

       else {
         $.post('/sample/scndTesting/edit/fumonisina/' + samplenumber+'/'+nowFumKit, () => {

         });
         el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

       }
    }


  }
});

//função de criação dos id dos Pchild para a fumonisina
var countFum=0;


function IdFumCount ()
{
  console.log("count FUMOSININA is: " + countFum);
    countFum++;
    return countFum;
}



const zearalenona = new jKanban({
  element : '#zearalenona',
  gutter  : '10px',
  widthBoard  : '190px',
  click : function(el) {
    alert(el.dataset.eid);
  },
  boards  : [
    {
      id : '_testing',
      title  : 'Em análise',
      class : 'success',
    },
    {
      id : '_ownering',
      title  : 'Aguardando pagamento',
      class : 'success',
    },
    {
      id : '_waiting',
      title  : 'Aguardando amostra',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;

    if  (target == '_testing') {
      $.post('/sample/testing/edit/zearalenona/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_ownering') {
      $.post('/sample/ownering/edit/zearalenona/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando pagamento' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }
    if  (target == '_waiting') {
      $.post('/sample/waiting/edit/zearalenona/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Aguardando amostra' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }

    if  (target == '_workmap') {
      $.post('/sample/mapwork/edit/zearalenona/' + samplenumber, () => {

      });
      el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho ' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

    }

  }
});

var scndZearalenona = new jKanban({
  element : '#zearalenona2',
  gutter  : '10px',
  widthBoard  : '165px',
  click : function(el) {
    window.location.href = 'sample/edit/' + el.dataset.eid;
  },
  boards  : [
    {
      id : '_scndTesting',
      title  : 'Em análise',
      class : 'info'
    },
    {
      id : '_calibrator',
      title  : 'Calibradores',
      class : 'success',
      item: [
          {
            title:'P1',
            id: 'P1'
          },

          {
            title:'P2',
            id: 'P2'
          },

          {
            title:'P3',
            id: 'P3'
          },

          {
            title:'P4',
            id: 'P4'
          },
          {
            title:'P5',
            id: 'P5'
          }
      ]
    },
    {
      id : '_workmap1',
      title  : 'Mapa de trabalho 1',
      class : 'success',
    },

  ],
  dropEl : function (el, target, source, sibling) {
    const samplenumber = el.dataset.eid;
    var goTO=target;
    console.log(goTO);
    if(target =='_calibrator'){
        var strId=el.dataset.eid; //id do card
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem
               return false
         }
         else if( strId.indexOf("child")!=-1){ //basicamente todo elemento que contenha child no id
           var id=el.dataset.eid;
           scndZearalenona.removeElement(id);
        } else {
          return false // impede outros cards de entrarem no board dos calibradores
        }
    }

    if( goTO.indexOf("workmap")!=-1) { //se o alvo for um board workmap qualquer
      var calibrator=el.dataset.eid;
        if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards originais

              var sonNumber=IdZCount(); //essa função gera os id dos childs dos cards, para que estes naa tenham msm id
              scndZearalenona.addElementStandart( goTO,
               {  id: el.dataset.eid +'child'+ sonNumber.toString(),
                  title: el.dataset.eid,

               });

           return false; // um card chil é criado no board alvo, mas o original retorna aos calibradores

        }   else if (calibrator.indexOf("child")!=-1) {

               return false;


        } else {
          var mapName=goTO.toString();


          $.post('/sample/mapedit/zearalenona/' + samplenumber+'/'+nowZKit+'/'+mapName,  () => {

          });
          el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Mapa de trabalho' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

      }
    }

    if(target=='_scndTesting') {
        var calibrator=el.dataset.eid;
      if( el.dataset.eid=='P1'||el.dataset.eid=='P2'||el.dataset.eid=='P3'||el.dataset.eid=='P4'||el.dataset.eid=='P5') {//cards P não se movem para em analise
             return false;
       }
       else if (calibrator.indexOf("child")!=-1) {

             return false;
       }
       else {
          $.post('/sample/scndTesting/edit/zearalenona/' + samplenumber+'/'+nowZKit, () => {

         });
         el.innerHTML = el.dataset.title + " "+ '<br><span  class="badge badge-secondary">' + 'Em análise' + '</span>'+ " "+ '<span  class="badge badge-primary">' + el.dataset.analyst + '</span>';

       }
    }


  }
});
//função de criação dos id dos Pchild para a fumonisina
var countZ=0;

function IdZCount ()
{
  console.log("count FUMOSININA is: " + countZ);
     countZ++;
    return countZ;
}


//cria cedulas kanban
$.get('/search/samples', (samples) => {
  $(document).ready(function() {
    samples.forEach((sample) => {
       if(!sample.isCalibrator){
        $.get('/search/userFromSample/'+sample._id,(user) =>{
          //AFLATOXINA
          if(sample.aflatoxina.active == true) {
            if(sample.aflatoxina.status=="Nova" || sample.aflatoxina.status=="Sem amostra" || sample.aflatoxina.status=="A corrigir") {
              if(user.debt) {
                aflatoxina.addElement('_waiting', {
                  id: "owner",
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status,
                  owner: "Devedor"
                });
              }
              else{
                aflatoxina.addElement('_waiting', {
                  id: sample.samplenumber,
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status
                });

              }

            }
            if(sample.aflatoxina.status=="Em análise"||sample.aflatoxina.status=="Mapa de Trabalho") {
              if(user.debt) {
                aflatoxina.addElement('_testing', {
                  id: "owner",
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status,
                  owner: "Devedor"
                });
                scndAflatoxina.addElement('_testing', {
                  id: "owner",
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status,
                  owner: "Devedor"
                });
              }
              else{
              aflatoxina.addElement('_testing', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.aflatoxina.status
              });
              if(sample.aflatoxina.status=="Em análise") {
                scndAflatoxina.addElement('_scndTesting', {
                  id: sample.samplenumber,
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status
                });
               }
             }

            }
            if(sample.aflatoxina.status=="Aguardando pagamento") {
              if(user.debt){
                aflatoxina.addElement('_ownering', {
                  id: "owner",
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status,
                  owner: "Devedor"
                });
              }
              else {
                aflatoxina.addElement('_ownering', {
                  id: sample.samplenumber,
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status,
                });
              }
            }
            if(sample.aflatoxina.status=="Aguardando amostra") {
              if(user.debt){
                aflatoxina.addElement('_waiting', {
                  id: "owner",
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status,
                  owner: "Devedor"
                });
              }
              else {
                aflatoxina.addElement('_waiting', {
                  id: sample.samplenumber,
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.aflatoxina.status
                });
              }
            }
            if(sample.aflatoxina.status=="Mapa de Trabalho") {
              scndAflatoxina.addElement('_workmap1', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.aflatoxina.status
              });
            }
          }

          //OCRATOXINA A
          if(sample.ocratoxina.active == true) {
            if(sample.ocratoxina.status=="Nova" || sample.ocratoxina.status=="Sem amostra" || sample.ocratoxina.status=="A corrigir") {
              ocratoxina.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.ocratoxina.status
              });
            }
            if(sample.ocratoxina.status=="Em análise"||sample.ocratoxina.status=="Mapa de Trabalho") {
              ocratoxina.addElement('_testing', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.ocratoxina.status
              });
              if(sample.ocratoxina.status=="Em análise") {
                scndOcratoxina.addElement('_scndTesting', {
                  id: sample.samplenumber,
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.ocratoxina.status
                });
              }

            }
            if(sample.ocratoxina.status=="Aguardando pagamento") {
              ocratoxina.addElement('_ownering', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.ocratoxina.status
              });
            }
            if(sample.ocratoxina.status=="Aguardando amostra") {
              ocratoxina.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.ocratoxina.status
              });
            }
            if(sample.ocratoxina.status=="Mapa de Trabalho") {
              scndOcratoxina.addElement('_workmap1', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.ocratoxina.status
              });
            }

          }

          //DEOXINIVALENOL
          if(sample.deoxinivalenol.active == true) {
            if(sample.deoxinivalenol.status=="Nova" || sample.deoxinivalenol.status=="Sem amostra" || sample.deoxinivalenol.status=="A corrigir") {
              deoxinivalenol.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.deoxinivalenol.status
              });
            }
            if(sample.deoxinivalenol.status=="Em análise"||sample.deoxinivalenol.status=="Mapa de Trabalho") {
              deoxinivalenol.addElement('_testing', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.deoxinivalenol.status
              });
              if(sample.deoxinivalenol.status=="Em análise") {
                  scndDeoxinivalenol.addElement('_scndTesting', {
                    id: sample.samplenumber,
                    title: "Amostra " + sample.samplenumber,
                    analyst: sample.responsable,
                    status: sample.deoxinivalenol.status
                  });
              }

            }
            if(sample.deoxinivalenol.status=="Aguardando pagamento") {
              deoxinivalenol.addElement('_ownering', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.deoxinivalenol.status
              });
            }
            if(sample.deoxinivalenol.status=="Aguardando amostra") {
              deoxinivalenol.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.deoxinivalenol.status
              });
            }
            if(sample.deoxinivalenol.status=="Mapa de Trabalho") {
              scndDeoxinivalenol.addElement('_workmap1', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.deoxinivalenol.status
              });
            }
          }

          //ZEARALENONA
          if(sample.zearalenona.active == true) {
            if(sample.zearalenona.status=="Nova" || sample.zearalenona.status=="Sem amostra" || sample.zearalenona.status=="A corrigir") {
              zearalenona.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.zearalenona.status
              });
            }
            if(sample.zearalenona.status=="Em análise"||sample.zearalenona.status=="Mapa de Trabalho") {
              zearalenona.addElement('_testing', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.zearalenona.status
              });
              scndZearalenona.addElement('_scndTesting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.zearalenona.status
              });
            }
            if(sample.zearalenona.status=="Aguardando pagamento") {
              zearalenona.addElement('_ownering', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.zearalenona.status
              });
            }
            if(sample.zearalenona.status=="Aguardando amostra") {
              zearalenona.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.zearalenona.status
              });
            }
            if(sample.zearalenona.status=="Mapa de Trabalho") {
              scndZearalenona.addElement('_workmap1', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.zearalenona.status
              });
            }
          }

          //T-2 TOXINA
          if(sample.t2toxina.active == true) {
            if(sample.t2toxina.status=="Nova" || sample.t2toxina.status=="Sem amostra" || sample.t2toxina.status=="A corrigir") {
              t2toxina.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.t2toxina.status
              });
            }
            if(sample.t2toxina.status=="Em análise"||sample.t2toxina.status=="Mapa de Trabalho") {
              t2toxina.addElement('_testing', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.t2toxina.status
              });
              if(sample.t2toxina.status=="Em análise") {
                scndT2toxina.addElement('_scndTesting', {
                  id: sample.samplenumber,
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.t2toxina.status
                });
              }

            }
            if(sample.t2toxina.status=="Aguardando pagamento") {
              t2toxina.addElement('_ownering', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.t2toxina.status
              });
            }
            if(sample.t2toxina.status=="Aguardando amostra") {
              t2toxina.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.t2toxina.status
              });
            }
            if(sample.t2toxina.status=="Mapa de Trabalho") {
            scndT2toxina.addElement('_workmap1', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.t2toxina.status
              });
            }
          }

          //FUMOSININA
          if(sample.fumonisina.active == true) {
            if(sample.fumonisina.status=="Nova" || sample.fumonisina.status=="Sem amostra" || sample.fumonisina.status=="A corrigir") {
              fumonisina.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.fumonisina.status
              });
            }
            if(sample.fumonisina.status=="Em análise"||sample.fumonisina.status=="Mapa de Trabalho") {
              fumonisina.addElement('_testing', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.fumonisina.status
              });
              if(sample.fumonisina.status=="Em análise") {
                scndFumonisina.addElement('_scndTesting', {
                  id: sample.samplenumber,
                  title: "Amostra " + sample.samplenumber,
                  analyst: sample.responsable,
                  status: sample.fumonisina.status
                });
              }

            }
            if(sample.fumonisina.status=="Aguardando pagamento") {
              fumonisina.addElement('_ownering', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.fumonisina.status
              });
            }
            if(sample.fumonisina.status=="Aguardando amostra") {
              fumonisina.addElement('_waiting', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.fumonisina.status
              });
            }
            if(sample.fumonisina.status=="Mapa de Trabalho") {
              scndFumonisina.addElement('_workmap1', {
                id: sample.samplenumber,
                title: "Amostra " + sample.samplenumber,
                analyst: sample.responsable,
                status: sample.fumonisina.status
              });
            }

          }
        });
      }



    });

  });
});

//Funções "hide" para puxar os kits desejados(A,B,C)



var nowAflaKit;
$('#KitRadioAfla').change(function(){
     console.log("DENTRO DA RADIOAFLA");
     var aflaLimit=0;
    $.get('/search/kits', (kits) => {
         console.log("BUSCANDO");
      $(document).ready(function() {
        console.log("LENDO");
        kits.forEach((kit) => {
          var kitToxin=kit.productCode;
          console.log(kitToxin);
          if(kitToxin.includes("AFLA")||kitToxin.includes("Afla") ) {
            if($('#KitAflaA').is(':checked')&&kit.kitType=="A") {
                $('#hideAfla').removeClass('form-disabled');
                 console.log("É UM AFLA DO TIPO A!!!!!");
                 aflaLimit=kit.stripLength;
                 nowAflaKit=kit._id;
                 aflacount = aflaLimit;
                 $.post('/sample/setActiveKit/'+kitToxin+'/' + nowAflaKit, () => {

                 });

            }
             else if ($('#KitAflaB').is(':checked')&&kit.kitType=="B") {
                 $('#hideAfla').removeClass('form-disabled');
                 console.log("É UM AFLA DO TIPO B!!!!!");
                 aflaLimit=kit.stripLength;
                 nowAflaKit=kit._id;
                 aflacount = aflaLimit;
                 $.post('/sample/setActiveKit/'+kitToxin+'/' + nowAflaKit, () => {

                 });

             }
             else if ($('#KitAflaC').is(':checked')&&kit.kitType=="C") {
                  console.log("É UM AFLA DO TIPO C!!!!!");
                  $('#hideAfla').removeClass('form-disabled');
                  aflaLimit=kit.stripLength;
                  nowAflaKit=kit._id;
                  aflacount = aflaLimit;
                  $.post('/sample/setActiveKit/'+kitToxin+'/' + nowAflaKit, () => {

                  });
             }
            else {
                $('#hideAfla').addClass('form-disabled');
            }
            for(i=1;i<aflaLimit;i++){//the map 0 was defined before
              scndAflatoxina.addBoards(
                      [{
                          'id' : '_workmap' + (i+1),
                          'title'  : 'Mapa de trabalho' + ' '+ (i+1),
                          'class' : 'info',
                      }]
                  )
            }
            console.log(aflaLimit);
            console.log(nowAflaKit);
          }

      })
    })
  })

});

var nowOcraKit;
$('#KitRadioOcra').change(function(){
  var ocraLimit;
    console.log("DENTRO DA KitRadioOcra");
   $.get('/search/kits', (kits) => {
        console.log("BUSCANDO");
     $(document).ready(function() {
       console.log("LENDO");
       kits.forEach((kit) => {
         var kitToxin=kit.productCode;
         console.log(kitToxin);
         if(kitToxin.includes("OTA")||kitToxin.includes("Och")) {
           console.log("Ocra");
           if($('#KitOcraA').is(':checked')&&kit.kitType=="A") {
               $('#hideOcra').removeClass('form-disabled');
                ocraLimit=kit.stripLength;
                nowOcraKit=kit._id;
                ocracount = ocraLimit;
                $.post('/sample/setActiveKit/'+kitToxin+'/' + nowOcraKit, () => {

                });

           }
            else if($('#KitOcraB').is(':checked')&&kit.kitType=="A") {
                 $('#hideOcra').removeClass('form-disabled');
                  ocraLimit=kit.stripLength;
                    nowOcraKit=kit._id;
                    ocracount = ocraLimit;
                    $.post('/sample/setActiveKit/'+kitToxin+'/' + nowOcraKit, () => {

                    });
             }
            else if ($('#KitOcraC').is(':checked')&&kit.kitType=="C") {
              $('#hideOcra').removeClass('form-disabled');
               ocraLimit=kit.stripLength;
                nowOcraKit=kit._id;
                ocracount = ocraLimit;
                $.post('/sample/setActiveKit/'+kitToxin+'/' + nowOcraKit, () => {

                });
            }
           else {
               $('#hideOcra').addClass('form-disabled');
           }

           for(i=1;i<ocraLimit;i++){//the map 0 was defined before
             scndOcratoxina.addBoards(
                     [{
                         'id' : '_workmap' + (i+1),
                         'title'  : 'Mapa de trabalho' + ' '+ (i+1),
                         'class' : 'info',
                     }]
                 )
           }

         }

     })
   })
  })

});


var nowDeoxKit;
$('#KitRadioDeox').change(function(){
  var deoxLimit;

    console.log("DENTRO DA KitRadioDeox");
   $.get('/search/kits', (kits) => {
        console.log("BUSCANDO");
     $(document).ready(function() {
       console.log("LENDO");
       kits.forEach((kit) => {
         var kitToxin=kit.productCode;
         console.log(kitToxin);
         if(kitToxin.includes("DON")) {
           console.log(kit.kitType);
           if($('#KitDeoxA').is(':checked')&&kit.kitType=="A") {
               $('#hideDeox').removeClass('form-disabled');
                deoxLimit=kit.stripLength;
                nowDeoxKit=kit._id;
                deoxcount = deoxLimit;
                $.post('/sample/setActiveKit/'+kitToxin+'/' + nowDeoxKit, () => {

                });

           }
            else if($('#KitDeoxB').is(':checked')&&kit.kitType=="B") {
              $('#hideDeox').removeClass('form-disabled');
               deoxLimit=kit.stripLength;
               nowDeoxKit=kit._id;
               deoxcount = deoxLimit;
               $.post('/sample/setActiveKit/'+kitToxin+'/' + nowDeoxKit, () => {

               });
             }
            else if (kit.kitType=="C"&&$('#KitDeoxC').is(':checked')) {
              $('#hideDeox').removeClass('form-disabled');
               deoxLimit=kit.stripLength;
                 nowDeoxKit=kit._id;
                 deoxcount = deoxLimit;
                 $.post('/sample/setActiveKit/'+kitToxin+'/' + nowDeoxKit, () => {

                 });
            }
           else {
               $('#hideDeox').addClass('form-disabled');
           }

           for(i=1;i<deoxLimit;i++){//the map 0 was defined before
             scndDeoxinivalenol.addBoards(
                     [{
                         'id' : '_workmap' + (i+1),
                         'title'  : 'Mapa de trabalho' + ' '+ (i+1),
                         'class' : 'info',
                     }]
                 )
           }

         }

     })
   })
  })
});

var nowFumKit;
$('#KitRadioFum').change(function(){
    console.log("DENTRO DA KitRadioFum");
     var fumLimit;
   $.get('/search/kits', (kits) => {
        console.log("BUSCANDO");
     $(document).ready(function() {
       console.log("LENDO");
       kits.forEach((kit) => {
         var kitToxin=kit.productCode;
         console.log(kitToxin);
         if(kitToxin.includes("FUMO")||kitToxin.includes("Fum")) {
           console.log(kit.kitType);
           if($('#KitFumA').is(':checked')&&kit.kitType=="A") {
               $('#hideFum').removeClass('form-disabled');
                  fumLimit=kit.stripLength;
                  nowFumKit=kit._id;
                  fumcount = fumLimit;
                  $.post('/sample/setActiveKit/'+kitToxin+'/' + nowFumKit, () => {

                  });

           }
            else if($('#KitFumB').is(':checked')&&kit.kitType=="B") {
              $('#hideFum').removeClass('form-disabled');
                 fumLimit=kit.stripLength;
                 nowFumKit=kit._id;
                 fumcount = fumLimit;
                 $.post('/sample/setActiveKit/'+kitToxin+'/' + nowFumKit, () => {

                 });
             }
            else if (kit.kitType=="C"&&$('#KitFumC').is(':checked')) {
              $('#hideFum').removeClass('form-disabled');
                  fumLimit=kit.stripLength;
                   nowFumKit=kit._id;
                   fumcount = fumLimit;
                   $.post('/sample/setActiveKit/'+kitToxin+'/' + nowFumKit, () => {

                   });
            }
           else {
               $('#hideFum').addClass('form-disabled');
           }

           for(i=1;i<fumLimit;i++){//the map 0 was defined before
             scndFumonisina.addBoards(
                     [{
                         'id' : '_workmap' + (i+1),
                         'title'  : 'Mapa de trabalho' + ' '+ (i+1),
                         'class' : 'info',
                     }]
                 )
           }


         }

     })
   })
  })
});

var nowT2Kit;

$('#KitRadioT').change(function(){
  var t2Limit;
    console.log("DENTRO DA KitRadioT");
   $.get('/search/kits', (kits) => {
        console.log("BUSCANDO");
     $(document).ready(function() {
       console.log("LENDO");
       kits.forEach((kit) => {
         var kitToxin=kit.productCode;
         console.log(kitToxin);
         if(kitToxin.includes("T2")) {
           console.log(kit.kitType);
           if($('#KitTA').is(':checked')&&kit.kitType=="A") {
               $('#hideT').removeClass('form-disabled');
                  t2Limit=kit.stripLength;
                  nowT2Kit=kit._id;
                  t2count = t2Limit;

           }
            else if($('#KitTB').is(':checked')&&kit.kitType=="B") {
              $('#hideT').removeClass('form-disabled');
                   t2Limit=kit.stripLength;
                   nowT2Kit=kit._id;
                   t2count = t2Limit;

             }
            else if (kit.kitType=="C"&&$('#KitTC').is(':checked')) {
              $('#hideT').removeClass('form-disabled');
                    t2Limit=kit.stripLength;
                    nowT2Kit=kit._id;
                    t2count = t2Limit;
            }
           else {
               $('#hideT').addClass('form-disabled');
           }

           for(i=1;i<t2Limit;i++){//the map 0 was defined before
             scndT2toxina.addBoards(
                     [{
                         'id' : '_workmap' + (i+1),
                         'title'  : 'Mapa de trabalho' + ' '+ (i+1),
                         'class' : 'info',
                     }]
                 )
           }

         }

     })
   })
  })
});

var nowZKit;
$('#KitRadioZ').change(function(){
    var zLimit;
    console.log("DENTRO DA KitRadioZ");
   $.get('/search/kits', (kits) => {
        console.log("BUSCANDO");
     $(document).ready(function() {
       console.log("LENDO");
       kits.forEach((kit) => {
         var kitToxin=kit.productCode;
         console.log(kitToxin);
         if(kitToxin.includes("ZEA")||kitToxin.includes("Zea")) {
           console.log(kit.kitType);
           if($('#KitZA').is(':checked')&&kit.kitType=="A") {
               $('#hideZ').removeClass('form-disabled');
                  zLimit=kit.stripLength;
                  nowZKit=kit._id;
                  $.post('/sample/setActiveKit/'+kitToxin+'/' + nowZKit, () => {

                  });

           }
            else if($('#KitZB').is(':checked')&&kit.kitType=="B") {
              $('#hideZ').removeClass('form-disabled');
                 zLimit=kit.stripLength;
                   nowZKit=kit._id;
                   $.post('/sample/setActiveKit/'+kitToxin+'/' + nowZKit, () => {

                   });

             }
            else if (kit.kitType=="C"&&$('#KitZC').is(':checked')) {
              $('#hideZ').removeClass('form-disabled');
                 zLimit=kit.stripLength;
                   nowZKit=kit._id;
                   $.post('/sample/setActiveKit/'+kitToxin+'/' + nowZKit, () => {

                   });
            }
           else {
               $('#hideZ').addClass('form-disabled');
           }

           for(i=1;i<zLimit;i++){//the map 0 was defined before
             scndZearalenona.addBoards(
                     [{
                         'id' : '_workmap' + (i+1),
                         'title'  : 'Mapa de trabalho' + ' '+ (i+1),
                         'class' : 'info',
                     }]
                 )
           }

         }

     })
   })
  })
});


  //
  // // Use of Date.now() function
  // var d = Date(Date.now());
  //
  // // Converting the number of millisecond in date string
  // a = d.toString()
  //
  // // Printing the current date
  //
  //   // Use of Date.now() function
  //   var d = Date(Date.now());
  //
  //   // Converting the number of millisecond in date string
  //   a = d.toString()
  //
  //
  //   var contando = 0;
  //   var ano = new Array;
  //   for(var cont = 0; cont < a.length; cont++){
  //     if(a[cont] == 1||2||3||4||5||6||7||8||9||0){
  //       ano2[contando] = a=[cont];
  //       ano[contando] = a [cont] ;
  //       contando++;
  //     }
  //   }
  //   ano = ano.toString;
  //   document.write(ano);
