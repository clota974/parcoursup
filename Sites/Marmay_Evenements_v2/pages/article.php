<?php require_once('../src/before.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../src/head.php"); ?>
    <title>Marmay Evenements</title>
    <script src="/pro/js/article.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/css/article.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../src/header.php"); ?>
    <?php require_once("../src/pretty_header.php"); ?>
    <input type="hidden" id="file" value="<?= $_GET["article"] ?>">
    <section class="content">
    </section>
    <footer>
      <?php require_once('../src/footer.php'); ?>
    </footer>
  </body>
</html>
