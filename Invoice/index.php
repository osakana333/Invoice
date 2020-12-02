<?php  include_once '../header.php'; ?>

<h2>請求書め～か～</h2>
<!--  -->
<form action="post">

  <p>
  <select class="select" name="destination" id="destination">
  <option value="0">宛先社名を選択</option>
  <?php
  foreach ($pdo->query('select * from tokuisaki') as $row) {
  ?>
        <option value="<?=$row['tk_id']?>"><?=$row['tk_mei']?></option>
  <?php
  }
  ?>
  </select>

  <input class="input" type="date" name="date" id="date" required>

  <p>
  請求者ID
  <select name="claimantID" id="claimantID">
    <option value="0"></option>
    <?php
    foreach ($pdo->query('select * from seikyusha') as $row) {
    ?>
      <option value="<?=$row['ow_id']?>"><?=$row['ow_id']?></option>
    <?php
    }
    ?>
  </select>

  <input class="input col100" type="text" name="cZip" placeholder="請求者 〒">
  <input class="input col" type="text" name="cAddr" placeholder="請求者住所">
  <input class="input col100" type="text" name="cName" placeholder="請求者名称">

  <div class="tableList">
    <div class="col">科目名</div>
    <div class="col100">数量</div>
    <div class="col50">単位</div>
    <div class="col100">単価</div>
    <div class="col100">金額</div>
    <div class="thead">
      <div class="tr">
        <div class="th">科目名</div>
        <div class="th">数量</div>
        <div class="th">単位</div>
        <div class="th">単価</div>
        <div class="th">金額</div>
        <div class="th">備考</div>
      </div>
    </div>
    <div class="tbody">
      <div class="tr" id="1">
        <!--  -->
        <div class="td">
          <select class="selectItem" name="item" id='item1'>
            <option value="0">科目名を選択</option>
            <?php
            foreach ($pdo->query('select * from kamoku') as $row) {
            ?>
              <option value="<?=$row['km_id']?>"><?=$row['km_mei']?></option>
            <?php
            }
            ?>
          </select>
        </div>
        <div class="td">
          <input class="qu" type="number" name="qu1" id='qu1'>
        </div>
        <div class="td">
          <input class="unit" type="text" name="unit1" id='unit1'>
        </div>
        <div class="td">
          <input class="price" type="number" name="price1" id='price1'>
        </div>
        <div class="td">
          <input class="amount" type="number" name="amount1" id='amount1'>
        </div>
        <div class="td">
          <input class="note" type="text" name="note1" id='note1'>
        </div>
      </div>
    </div>
  </div>
    <hr>
  <div class="memo">
    <div class="col">数量</div>
      <div class="tr">
        <div class="td">
        <textarea name="memo" id="memo" cols="30" rows="8s" placeholder=" 備考"></textarea>
        </div>
        <div class="td">
        <p><input type="checkbox" class="checkbox" name="intax" id="intax">内税表記
        <p><input type="checkbox" class="checkbox" name="withhold" id="withhold">源泉徴収差引
        </div>
      </div>
  </div>

  <div class="table">
    <div class="col100">数量</div>
    <div class="col100">単位</div>
    <div class="col">単価</div>
      <div class="tr">
        <div class="td" id="ms_subtotal">小計(税抜)</div>
        <div class="td"><input class="input" type="number" name="subtotal" id="subtotal" value="0"></div>
        <div class="td"><input type="button" value="１行追加" id='clone'></div>
      </div>
      <div class="tr">
        <div class="td">税額</div>
        <div class="td"><input class="input" type="number" name="tax" id="tax" value="0"></div>
        <div class="td"></div>
      </div>
      <div class="tr">
        <div class="td">源泉徴収差引</div>
        <div class="td"><input class="input" type="number" name="taxwh" id="taxwh"></div>
        <div class="td"></div>
      </div>
      <div class="tr">
        <div class="td">合計</div>
        <div class="td"><input class="input" type="number" name="total" id="total" value="0"></div>
        <div class="td center"><input type="submit" value="確認"></div>
      </div>
  </div>

</form>

<?php  include_once '../footer.php'; ?>