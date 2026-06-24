<?php
// The template singleton carries scheduled meta across tests in the same
// process; start each pass clean so the capture reflects only this fixture
tangible_template()->scheduled_meta_tags = [];
