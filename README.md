Filelist NG
===========

    
Development
-----------

Install php dependencies using composer:
    
    $ composer install
    
Install web components

    $ (cd Build; npm install)
    
Build web components
    
    $ (cd Build; npm build:prod)
    
    
[PHPUnit](https://phpunit.de) Unit tests
-----------------------------------

    $ etc/scripts/runTests.sh

[PHPUnit](https://phpunit.de) Functional tests
-----------------------------------

    $ etc/scripts/runTests.sh -s functional


[Easy-Coding-Standard](https://github.com/Symplify/EasyCodingStandard)
----------------------------------------------------------------------

Check coding standard violations violations

    $ etc/scripts/checkCodingStandards.sh 
    
Fix coding standard violations automatically
    
    $ etc/scripts/checkCodingStandards.sh --fix
