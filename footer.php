<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script type="text/javascript">
  <?php  
  $claimantData = $pdo->query('select * from seikyusha') ;
  $claimantData = $claimantData->fetchAll(PDO::FETCH_ASSOC|PDO::FETCH_UNIQUE);
  $cm_json = json_encode($claimantData,JSON_UNESCAPED_UNICODE);
  $cm_json = str_replace('\r\n','\\\n',$cm_json);
  
  $itemData = $pdo->query('select * from kamoku') ;
  $itemData = $itemData->fetchAll(PDO::FETCH_ASSOC|PDO::FETCH_UNIQUE);
  $id_json = json_encode($itemData,JSON_UNESCAPED_UNICODE);
  ?>
  var itemData = JSON.parse('<?php echo $id_json; ?>');
  var claimantData = JSON.parse('<?php echo $cm_json; ?>');
</script>
<script src="script.js"></script>
</body>
</html>