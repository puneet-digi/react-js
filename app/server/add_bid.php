<?php

    require('connection.php');
    error_reporting( E_ALL );
    ini_set('display_errors', 1); 

    $posted_data = json_decode(file_get_contents('php://input'), true);
    $time_stamp = date('Y-m-d h:i:s');
    if(!empty($posted_data)){
        $string = "INSERT INTO bids (id, `user_id`, `title`, `bid_link`, `description`, `lead`, `conversion`, `created_date`)
            VALUES (NULL, " 
                . $posted_data['user_id'] . ", '" . $posted_data['title'] ."' , '" . $posted_data['bid_link'] . "', '" . $posted_data['description'] . " ', NULL, NULL, '"  . $time_stamp . "');";
        if ($mysqli->query($string)){
            echo json_encode(['success' => true, 'id' => $mysqli->insert_id]);
        } else {
            echo json_encode(['error' => 1, 'message' => 'Failed to Insert Data']);
        }
        exit;
    }
