<?php

	class Ticket{
		public $serialNbr;
		public $numbers = array();

		public function __construct($nbr, $array){
			$this->serialNbr = $nbr;

			for ($i=0; $i < count($array); $i++) {
				$tmp = new Number($array[$i]);
				array_push($this->numbers, $tmp);
			}
		}
	}

	class Number{
		public $id;
		public $value;
		public $checked;

		public function __construct($array){
			$this->id = $array["id"];
			$this->value = $array["number"];
			$this->checked = $array["checked"];
		}
	}

	$game = array();

	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=quine;charset=utf8', 'root', 'root');
	}
	catch (Exception $e)
	{
		die('Erreur SQL : ' . $e->getMessage());
	}

	$req1 = $bdd->query("SELECT * FROM ticket");
	$tickets = $req1->fetchAll();

	for ($i=0; $i < count($tickets); $i++) {
		$req2 = $bdd->prepare("SELECT * FROM numbers WHERE ticket = ? ORDER BY number");
		$req2->execute(array($tickets[$i]["serial"]));
		$list = $req2->fetchAll();

		$tmp = new Ticket($tickets[$i]["serial"], $list);

		array_push($game, $tmp);
	}

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Loto Quine</title>
    <link rel="stylesheet" href="list.css" title="no title" charset="utf-8">
    <script src="../jquery.js" charset="utf-8"></script>
    <script src="list.js" charset="utf-8"></script>
  </head>
  <body>
    <header>
      <div class="interact">
        <input type="number" id="nbr" />
        <button type="button" name="button" id="add">Ajouter</button>
        <button type="button" name="button" id="search">Rechercher</button>
        <button type="button" name="button" id="remove">Enlever</button>
        <button type="button" name="button" id="reset">Reset</button>
      </div>
      <div class="numbers" id="numbers"></div>
    </header>
    <table>
      <?php for ($i=0; $i < count($game); $i++): ?>
				<tr id="<?php echo $game[$i]->serialNbr ?>">
					<td><?php echo $game[$i]->serialNbr ?></td>
					<?php for ($a=0; $a < count($game[$i]->numbers); $a++): ?>
						<?php $r = $game[$i]->numbers[$a];  ?>
						<td id="<?php echo $r->id; ?>" data-value="<?php echo $r->value; ?>" data-checked="<?php echo $r->checked; ?>"></td>
					<?php endfor; ?>
					<td>10</td>
				</tr>
			<?php endfor; 	?>
    </table>
  </body>
</html>
