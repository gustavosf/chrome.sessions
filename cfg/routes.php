<?php

Router::get('/', array('bolao', 'index'));

Router::get('/apostar', array('apostar', 'index'));
Router::get('/apostar/:tab', array('apostar', 'index'));