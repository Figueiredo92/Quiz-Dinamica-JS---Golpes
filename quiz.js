(function() {
  var questoes = [{
    Questão: '"Ocorre nas redes sociais e os golpistas roubam informações pessoais e/ou vendem produtos falsos."',
    opcoes: ["Golpe do Perfil Falso","Golpe do SMS", "Golpe do Boleto", "Golpe do Investimento","Golpe do Whatsapp"],
    respostaCorreta: 0
  }, {
    Questão: '"É gerada uma cobrança inexistente com os dados pessoais da vítima"',
    opcoes: ["Golpe do Perfil Falso","Golpe do SMS", "Golpe do Boleto", "Golpe do Investimento","Golpe do Whatsapp"],
    respostaCorreta: 2
  }, {
    Questão: '“Os bandidos clonam o número e utilizam de uma rede social para pedir dinheiro para os contatos da vítima.”',
    opcoes: ["Golpe do Perfil Falso","Golpe do SMS", "Golpe do Boleto", "Golpe do Investimento","Golpe do Whatsapp"],
    respostaCorreta: 4
  }, {
    Questão: '“É prometido um ganho com criptomoedas, o golpista recebe o dinheiro e desaparece, o lucro prometido também não existe.”',
    opcoes: ["Golpe do Perfil Falso","Golpe do SMS", "Golpe do Boleto", "Golpe do Investimento","Golpe do Whatsapp"],
    respostaCorreta: 3
  }, {
    Questão: '"Ocorre via mensagens e garelmente são enviados links falsos e dados bancários. "',
    opcoes: ["Golpe do Perfil Falso","Golpe do SMS", "Golpe do Boleto", "Golpe do Investimento","Golpe do Whatsapp"],
    respostaCorreta: 1
    
  }];
 
  var QuestãoCounter = 0; 
  var selecao = [];
  var quiz = $('#quiz'); 
   /* 

            document.getElementById("opt1").innerHTML = questões[questãoCounter].opcoes
            document.getElementById("opt2").innerHTML = questões[questãoCounter].opcoes
            document.getElementById("opt3").innerHTML = questões[questãoCounter].opcoes
            document.getElementById("opt4").innerHTML = questões[questãoCounter].opcoes
           // document.getElementById("opt5").innerHTML = questões[questãoCounter].opcoes[4]
 */
         

    /* document.getElementById("opt1").onclick = () => {
        
        options.push("opt1")
        setAnswersStart()

    }
    document.getElementById("opt2").onclick = () => {

        options.push("opt2")
        setAnswersStart()
    

    }
    document.getElementById("opt3").onclick = () => {
        options.push("opt3")
        
        setAnswersStart()
    
    }
    document.getElementById("opt4").onclick = () => {
        options.push("opt4")
        setAnswersStart()
  
    }
    document.getElementById("opt5").onclick = () => {
        options.push("opt5")
        setAnswersStart()
    
    }
   */
  
  
  displayNext();
  
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    if (isNaN(selecao[QuestãoCounter])) {
      alert('Por favor, selecione uma opção!');
    } else {
      QuestãoCounter++;
      displayNext();
    }
  });
  
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    QuestãoCounter--;
    displayNext();
  });
  
  // fazer de novo
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    QuestãoCounter = 0;
    selecao = [];
    displayNext();
    $('#start').hide();
  });
  

  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  function createQuestãoElement(index) {
    var qElement = $('<div>', {
      id: 'Questão'
    });
    
    var header = $('<h2>Questão ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var Questão = $('<p>').append(questoes[index].Questão);
    qElement.append(Questão);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questoes[index].opcoes.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questoes[index].opcoes[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  function choose() {
    selecao[QuestãoCounter] = +$('input[name="answer"]:checked').val();
  }
  
 
  function displayNext() {
    quiz.fadeOut(function() {
      $('#Questão').remove();
      
      if(QuestãoCounter < questoes.length){
        var nextQuestão = createQuestãoElement(QuestãoCounter);
        quiz.append(nextQuestão).fadeIn();
        if (!(isNaN(selecao[QuestãoCounter]))) {
          $('input[value='+selecao[QuestãoCounter]+']').prop('checked', true);
        }
        
       
        if(QuestãoCounter === 1){
          $('#prev').show();
        } else if(QuestãoCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // pontuacao
  function displayScore() {
    var score = $('<p>',{id: 'Questão'});
    
    var nCorreto = 0;
    for (var i = 0; i < selecao.length; i++) {
      if (selecao[i] === questoes[i].respostaCorreta) {
        nCorreto++;
      }
    }
    
    score.append('Você acertou ' + nCorreto + ' questões de ' +
                 questoes.length + '!!!');
    return score;
  }
})();