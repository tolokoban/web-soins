<?php
$ROLE = '';  // Everyone can access this service.

/*
   First step:
   -----------
   Call tfw.Install("cameroun_").
   If the result is 0, everything is already installed.
   Otherwise, the result will be -9.

   Second step:
   ------------
   Call tfw.Install({
   prefix: "cameroun_",
   host: "127.0.0.1",
   name: "database-name",
   dbUsr: "root",
   dbPwd: "database-password",
   usr: "Website-user",
   pwd: "user-password"
   })
   The prefix is own in the session, that's why we don't provide it again.
   The file "pri/install.sql" will be applyed to the database.
   This file is a MySQL file with these placeholders: "${PREFIX}"

   Here are the possible results :
 *  0: Installation done successfully.
 * -1: Missing mandatory argument.
 * -2: Unknown host.
 * -3: Database not found.
 * -4: Invalid user name or password.
 * -5: Missing "pri/install.sql" file.
 * -6: DB is not empty.
 */
function execService($args) {
    error_log("tfw.Install: " . json_encode($args));
    $configFile = "./php/@db.cfg.inc";

    if( is_string( $args ) ) {
        if( file_exists( $configFile ) ) return 0;
        error_log("[tfw.Install] Config file does not exist: $configFile");
        return -9;
    }

    $mandatoryArguments = Array('prefix', 'host', 'name', 'dbUsr', 'dbPwd', 'usr', 'pwd');
    foreach( $mandatoryArguments as $name ) {
        if( !isset($args[$name]) ) {
            error_log("[tfw.Install] Missing argument `$name`!");
            error_log(json_encode( $args ));
            return -1;
        }
    }

    $createDatabase = $args['createDatabase'];
    $prefix = $args['prefix'] . '_';
    $host = $args['host'];
    $name = $args['name'];
    $dbUsr = $args['dbUsr'];
    $dbPwd = $args['dbPwd'];

    try {
        error_log("[tfw.Intall] Trying to connect to $name@$host...");
        $cnx = new PDO("mysql:host=$host;dbname=$name", $dbUsr, $dbPwd);
        $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        error_log("[tfw.Intall] ...Ok!");
    }
    catch (Exception $e) {
        $errCode = $e->getCode();
        switch( $errCode ) {
            case '2002': return -2; // Unknown host.
            case '1049': return -3; // Database not found.
            case '1045': return -4; // Bad usr/pwd.
        }
        error_log("host: $host");
        error_log("name: $name");
        error_log("dbUsr: $dbUsr");
        error_log("Error #" . $e->getCode());
        error_log($e->getMessage());
        return $e->getMessage();
    }

    if ($createDatabase) {
        $installFile = "./pri/install.sql";
        if( !file_exists( $installFile ) ) return -5;

        $date = date('Ymd');
        $usr = $args['usr'];
        $pwd = $args['pwd'];

        $sql = file_get_contents( $installFile );

        $sql = str_replace( '${PREFIX}', $prefix, $sql );
        $sql = str_replace( '${DATE}', $date, $sql );
        $sql = str_replace( '${USER}', $usr, $sql );
        $sql = str_replace( '${PASSWORD}', $pwd, $sql );

        try {
            error_log("[tfw.Intall] Executing 'pri/install.sql'...");
            $cnx->exec( $sql );
            error_log("[tfw.Intall] ...Ok!");
        }
        catch( Exception $e ) {
            $errCode = $e->getCode();
            switch( $errCode ) {
                case '42S01': return -6;  // DB is not empty.
                case '23000': return -6;  // DB is not empty.
            }
            error_log("Error #" . $e->getCode());
            error_log($e->getMessage());
            return $e->getMessage();
        }
    }

    $dbUsr = $args['dbUsr'];
    $dbPwd = $args['dbPwd'];
    file_put_contents(
        $configFile,
        "<?php \$DB_CFG=Array('host'=>'$host',"
        . "'name'=>'$name',"
      . "'usr'=>'$dbUsr',"
      . "'pwd'=>'$dbPwd',"
      . "'prefix'=>'$prefix');?>"
    );

    return 0;
}


function makeToken( $prefix ) {
    $token = md5(rand(1000000000, 9999999999));
    $_SESSION["token"] = $token;
    $_SESSION["prefix"] = $prefix;
    return $token;
}
?>
