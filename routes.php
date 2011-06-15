<?php

Router::get(':id/sessions', function($id) {
	if (!DB::userExists($id)) Router::error('Usuário não existe');
	
	$cursor = DB::userSessions($id);
	$sessions = array();
	foreach ($cursor as $id => $value) {
		$sessions[] = array(
			'id'     => $id,
			'name'   => $value['desc'],
			'date'   => date('d/m/y h\hi', $value['created']),
			'detail' => sizeof($value['tabs']).' tabs',
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
