$(function () {

  $('#clone').click(function () {
    $('.tbody .tr:first-child').clone(true, true).appendTo('.tbody');
    $('.tbody .tr:last-child').attr('id', $('.tbody .tr').length);
    $.each($('.tbody .tr:last-child').children('div'), function (key, val) {
      if (key==0) {
        $(val).children('select').attr('id', 'item' + $('.tbody .tr').length);
        $(val).children('select').attr('name', 'item' + $('.tbody .tr').length);
        $(val).children('select').val(0);
      } else {
        $(val).children('input').attr('id', $(val).children('input').attr('class') + $('.tbody .tr').length);
        $(val).children('input').attr('name', $(val).children('input').attr('class') + $('.tbody .tr').length);
        $(val).children('input').val('');
      }
    });
    return false;
  });

  var income_tax = [0.1021, 0.2042];

  var claimantData = {
    1: ['名前 太郎','000-0000','冒企県六分儀市忍里00-0','比良坂銀行忍里支店'] ,
    2: ['名前 花子','111-0000','冒企県六分儀市はぐれ坂00-0 昼顔荘4F 508号室','夜持銀行はぐれ坂支店'] ,
    3: ['名前 裕太','222-0000','冒企県六分儀市鞍馬田00-0','比良坂銀行六分儀中央支店']
  }
  
  var itemData = {
    1: ['兵糧丸','個','10000'],
    2: ['神通丸','個','20000'],
    3: ['遁甲符','枚','30000'],
  }

  $('#claimantID').change(function () { 
    var id = $('#claimantID').val();
    if (id==0) {
      $('[name="cName"]').val('');
      $('[name="cAddr"]').val('');
      $('[name="cZip"]').val('');
    } else {
      $('[name="cName"]').val(claimantData[id][0]);
      $('[name="cAddr"]').val(claimantData[id][2]);
      $('[name="cZip"]').val(claimantData[id][1])
    }
  });

  $('.selectItem').change(function () {
    var id = $(this).val();
    var row = $(this).parents('.tr').attr('id');
 
    if (id == 0) {
      $('#qu' + row).val('');
      $('#unit' + row).val('');
      $('#price' + row).val('');
      $('#amount' + row).val('');
      $('#note' + row).val('');
    } else {
      var cnt = 0;
      $.each($('.selectItem'), function (i, value) {
        if ($(value).val() == id) {
          cnt++;
        }
      });
      if (cnt > 1) {
        alert('科目名が重複しています');
        $('#item' + row).val(0);
      } else {
        $('#qu' + row).val('');
        $('#unit'+row).val(itemData[id][1]);
        $('#price' + row).val(itemData[id][2]);
        $('#amount' + row).val('');
        $('#note' + row).val('');
      }
    }
    total_tax();
  });

  $('.qu').change(function () {
    var row = $(this).parents('.tr').attr('id');
    var qu = $('#qu' + row).val();
    var price = $('#price' + row).val();
    if ($('#item' + row).val() == 0) {
      $('#amount'+row).val('');
    } else {
      $('#amount'+row).val(qu * price);
    }
    total_tax();
  });

  $('[type="checkbox"]').change(function () {
    total_tax();
  });

  function total_tax() {
    var subtotal = 0;
    $.each($('.amount'), function (cnt, value) {
      if (!parseFloat($(value).val())=='') {
        subtotal += parseFloat($(value).val());
      }
    });
    var tax = Math.round(subtotal * 0.08);
    var total = subtotal + tax;
    var exTotal = subtotal - tax;
    if (total > 1000000) {
      var taxwh1 = Math.round((total - 1000000) * income_tax[1] + (1000000 * income_tax[0]));
    } else {
      var taxwh1 = Math.round(total*income_tax[0]);
    }
    if (exTotal > 1000000) {
      var taxwh2 = Math.round((exTotal - 1000000) * income_tax[1] + (1000000 * income_tax[0]));
    } else {
      var taxwh2 = Math.round(exTotal*income_tax[0]);
    }
    var total1 = subtotal + tax - taxwh1
    var total2 = subtotal - taxwh2;

    // [subtotal, tax, exTotal, total, taxwh1, total1, taxwh2, total2];

    //外税+源泉徴収差引なし:小計subtotal,税額tax,合計total
    //外税+源泉徴収差引あり:小計subtotal,税額tax,源泉taxwh1,合計total1
    //内税+源泉徴収差引なし:課税対象額exTotal,税額tax,合計subtotal
    //内税+源泉徴収差引あり:課税対象額exTotal,税額tax,源泉taxwh2,合計total2

    //これ内税の計算ミスってる
    //先にチェックボックスで分岐して最後に値を突っ込む

    $('#tax').val(tax);
    if ($('#intax').prop('checked')) {
      $('#ms_subtotal').text('課税対象額');
      $('#subtotal').val(exTotal);
      if ($('#withhold').prop('checked')) {
        $('#total').val(total2);
        $('#taxwh').val(taxwh2);
      } else {
        $('#total').val(subtotal);
        $('#taxwh').val('');
      }
    } else {
      $('#ms_subtotal').text('小計(税込)');
      $('#subtotal').val(subtotal);
      if ($('#withhold').prop('checked')) {
        $('#total').val(total1);
        $('#taxwh').val(taxwh1);
      } else {
        $('#total').val(total);
        $('#taxwh').val('');
      }
    }
  }

});


/*
  ・科目が変更されたとき
  ・数量が変更されたとき
  ・金額が変更されたとき
  ・税額チェックボックスが変更されたとき
    に、小計、税額、合計を再計算する。

  チェックボックスで内税外税、源泉徴収表記を切り替える。
  初期設定は外税・源泉徴収なし
  
  バリデーションチェックを実装する
  
  見た目をましにする
  ・マイナスの数字は赤色にする。
*/