Filelist NG
==============

Getting Started
---------------

Install php dependencies using composer:
    
    $ composer install

Install web components

    $ (cd Build; npm install)
    
Build web components
    
    $ (cd Build; npm build)

    
[PHPUnit](https://phpunit.de) tests
-----------------------------------

[Easy-Coding-Standard](https://github.com/Symplify/EasyCodingStandard)
----------------------------------------------------------------------

Check coding standard violations violations

    $ etc/scripts/checkCodingStandards.sh 
    
Fix coding standard violations automatically
    
    $ etc/scripts/checkCodingStandards.sh --fix
