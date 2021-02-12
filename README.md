Mediamanager
===========

Development
-----------

Install php dependencies using composer:

    composer install

Install web components

    (cd Build; npm ci)

Build web components

    (cd Build; npm build:prod)


[PHPUnit](https://phpunit.de) Unit tests
-----------------------------------

    etc/scripts/runTests.sh

[PHPUnit](https://phpunit.de) Functional tests
-----------------------------------

    etc/scripts/runTests.sh -s functional

[PHPUnit](https://phpunit.de) Functional tests


[PHP Coding Standards Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer)
----------------------------------------------------------------------

Install php-cs-fixer tool via

    composer global require friendsofphp/php-cs-fixer

and then simply run

    ./bin/php-cs-fixer fix --config ./Build/.php_cs


Storybook
---------

    (cd Build; npm run storybook)


Documentation
-------------

Make `dockrun_t3rd available in current terminal


    source <(docker run --rm t3docs/render-documentation show-shell-commands)

Run `dockrun_t3rd`

    dockrun_t3rd makehtml

Open documentation

    open "Documentation-GENERATED-temp/Result/project/0.0.0/Index.html"

