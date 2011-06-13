<?php

require ROOT.DS.'cfg'.DS.'config.php';

require LIB_DIR.DS.'router.class.php';
require LIB_DIR.DS.'db.class.php';

require ROOT.DS.'routes.php';
Router::route($method, $url);