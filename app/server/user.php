<?php
    require('connection.php');
    $posted_data = $_REQUEST;
    /* Select queries return a resultset */
    if ($result = $mysqli->query("SELECT * FROM user WHERE email='" . $posted_data['email'] ."' AND password='" . $posted_data['password'] ."'")) {
        if($result->num_rows > 0){
            echo json_encode(['success' => 1, 'data' => $result->fetch_assoc()]);
        }else {
            echo json_encode(['error' => 1, 'message' => 'Login Failed!']);
        }

        /* free result set */
        $result->close();
    }   


