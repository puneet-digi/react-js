<?php
	require('connection.php');

	function getRatio($one, $two){
		$hcf = getHCF($one, $two);
		return $one/$hcf . ":" . $two/$hcf;
	}


	function getHCF($one, $two){
		$hcf = $one * $two/ getLCM($one, $two);
		return $hcf;
	}

	function getLCM($one, $two){
		$lcm = null;
		$lowest = $one < $two ? $one : $two;
		for($i = $lowest; ; $i++) {
		  if($i%$one == 0 && $i%$two == 0){
		  	$lcm = $i;
		    break;
		  }
		}
		return $lcm;
	}

	function getPercentage($one, $two){
		return ($one / $two) * 100;
	}

    $posted_data = $_REQUEST;

    $string = "SELECT * FROM bids where user_id= " . $posted_data['user_id'] . " ORDER BY `created_date` DESC";
	$results = $mysqli->query($string);
	$leadaCount = $mysqli->query("SELECT COUNT(*) FROM bids WHERE user_id= " . $posted_data['user_id'] . " AND lead IS NOT NULL ORDER BY `created_date` DESC")->fetch_row();
	$conversionCount = $mysqli->query("SELECT COUNT(*) FROM bids WHERE user_id= " . $posted_data['user_id'] . " AND conversion IS NOT NULL ORDER BY `created_date` DESC")->fetch_row();
	
	$ratiosArray =['bid_to_lead' => '0:0', 'lead_to_conversion' => '0:0'];
	if ($results->num_rows > 0){
		$data = $results->fetch_all(MYSQLI_ASSOC);
		$bidCount = count($data);
		if($bidCount > 0 && $leadaCount[0] > 0){
			$ratiosArray['bid_to_lead'] = getRatio($bidCount, $leadaCount[0]);
			$ratiosArray['bid_to_lead_percentage'] = round(getPercentage($leadaCount[0], $bidCount), 2);
		}
		if($leadaCount[0] > 0 && $conversionCount[0] > 0) {
			$ratiosArray['lead_to_conversion'] = getRatio($leadaCount[0], $conversionCount[0]);
			$ratiosArray['bid_to_conversion'] = getRatio($bidCount, $conversionCount[0]);
			$ratiosArray['lead_to_conversion_percentage'] = round(getPercentage($conversionCount[0], $leadaCount[0]), 2);
			$ratiosArray['bid_to_conversion_percentage'] = round(getPercentage($conversionCount[0], $bidCount), 2);
		}
		echo json_encode([
			'success' => true, 
			'total_count' => $bidCount, 
			'conversionCount' => $conversionCount[0], 
			'leadsCount' => $leadaCount[0], 
			'ratios' => $ratiosArray,
			'data' => $data
			], JSON_UNESCAPED_SLASHES);
	} else {
		echo json_encode(['error' => 1, 'message' => 'Failed to Read Data']);
	}
	
 	$results->close();