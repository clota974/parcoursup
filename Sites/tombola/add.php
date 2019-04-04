<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Ajouter - Quine</title>
    <script src="../jquery.js" charset="utf-8"></script>
    <script src="add.js" charset="utf-8"></script>
    <link rel="stylesheet" href="add.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <form action="post.php" method="post">
      <input type="text" name="proprio" id="proprio" placeholder="Propriétaire" />
      <input type="number" name="serial" id="serial" placeholder="Numéro de série" />
      <div class="numbers">
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
      </div>
      <button type="button" class="ajaxBtn">Envoyer</button>
      <button type="button" class="reset">Reset</button>
    </form>
    <div class="info">Information</div>
  </body>
</html>
