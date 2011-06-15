<?php

Router::get(':id/sessions', function($id) {
	if (!DB::userExists($id)) Router::error('Usuário não existe');
	
	$cursor = DB::userSessions($id);
	$sessions = array();
	foreach ($cursor as $id => $value) {
		$sessions[] = array(
			'id'     => $value['id'],
			'name'   => $value['desc'],
			'date'   => date('d/m/y h\hi', $value['created']),
			'detail' => sizeof($value['tabs']).' tabs',
			'tabs'   => $value['tabs'],
		);
	}
	Router::dispose($sessions);
});

Router::post(':id/session', function($id, $post) {
	if (!DB::userExists($id)) Router::error('Usuário não existe');
	
	$id = DB::userSession($id, $post['session']);
	Router::dispose(array('id' => $id));
});

Router::get('user/create', function() {
	$user = DB::userCreate('gustavosf@gmail.com');
	Router::dispose(array('id' => $user));
});

Router::delete(':id/session/:sid', function($id, $session) {
	if (!DB::sessionExists($id, $session)) Router::error('Sessão não existe!');
	DB::dropSession($session);
	Router::dispose(array());
});

Router::get(':id/session/:sid', function($id, $session) {
	if (!DB::sessionExists($id, $session)) Router::error('Sessão não existe!');

	$s = DB::getSession($session);
	Router::dispose($s);
});

Router::put(':id/session', function($id, $put) {
	if (!DB::userExists($id)) Router::error('Usuário não existe');
	
	$s = DB::createSession($id, $put);
	Router::dispose($sessions[] = array(
		'id'     => $s['id'],
		'name'   => $s['desc'],
		'date'   => date('d/m/y h\hi', $s['created']),
		'detail' => sizeof($s['tabs']).' tabs',
		'tabs'   => $s['tabs'],
	));
});