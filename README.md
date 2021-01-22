Filelist NG
===========

    
Development
-----------

Install php dependencies using composer:
    
    composer install
    
Install web components

    (cd Build; npm install)
    
Build web components
    
    (cd Build; npm build:prod)
    
    
[PHPUnit](https://phpunit.de) Unit tests
-----------------------------------

    etc/scripts/runTests.sh

[PHPUnit](https://phpunit.de) Functional tests
-----------------------------------

    etc/scripts/runTests.sh -s functional
    

[PHPUnit](https://phpunit.de) Functional tests


[Easy-Coding-Standard](https://github.com/Symplify/EasyCodingStandard)
----------------------------------------------------------------------

Check coding standard violations violations

    etc/scripts/checkCodingStandards.sh 
    
Fix coding standard violations automatically
    
    etc/scripts/checkCodingStandards.sh --fix


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

