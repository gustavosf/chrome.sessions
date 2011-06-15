<?php

class DB {
	public static function getDB(){
		static $instance;
		if (!is_object($instance)) {
			$m = new Mongo(DB_HOST);
			$instance = $m->{DB_NAME};
		}
		return $instance;
	}
	
	public static function userExists($id) {
		$db = self::getDB();
		$usr = $db->users->findOne(array('id' => $id));
		
		if ($usr) return true;
		return false;
	}
	
	public static function userSessions($id) {
		$db = self::getDB();

		return $db->sessions->find(array('user' => $id));
	}

	

	public static function userCreate($email) {
		$db = self::getDB();
		$id = uniqid();
		$db->users->insert(array(
			'id'    => $id,
			'email' => $email,
			'created' => time(),
		));

		return $id;
	}

	public static function sessionExists($userId, $sessionId) {
		$db = self::getDB();
		if ($db->sessions->findOne(array('user' => $userId, 'id' => $sessionId)))
			return true;
		return false;
	}

	public static function getSession($sessionId) {
		$db = self::getDB();
		$session = $db->sessions->findOne(array('id' => $sessionId));
		return $session;
	}
	
	public static function createSession($user, $session) {
		$db = self::getDB();
		$s = array(
			'id' => uniqid(),
			'user' => $user,
			'created' => time(),
			'desc' => $session['name'],
			'tabs' => $session['tabs'],
		);
		$db->sessions->insert($s);

		return $s;
	}
	
	public static function dropSession($session) {
		$db = self::getDB();
		return $db->sessions->remove(array('id' => $session));
	}
}
