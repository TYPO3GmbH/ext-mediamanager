<?php

declare(strict_types=1);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use PHP_CodeSniffer\Standards\Generic\Sniffs\ControlStructures\InlineControlStructureSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\Files\ByteOrderMarkSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\Formatting\DisallowMultipleStatementsSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\Functions\FunctionCallArgumentSpacingSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\NamingConventions\UpperCaseConstantNameSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\PHP\LowerCaseConstantSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\PHP\LowerCaseKeywordSniff;
use PHP_CodeSniffer\Standards\Generic\Sniffs\WhiteSpace\DisallowTabIndentSniff;
use PHP_CodeSniffer\Standards\PEAR\Sniffs\Functions\ValidDefaultValueSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Classes\ClassDeclarationSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Classes\PropertyDeclarationSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\ControlStructures\ElseIfDeclarationSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\ControlStructures\SwitchDeclarationSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Files\ClosingTagSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Files\EndFileNewlineSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Methods\FunctionCallSignatureSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Methods\FunctionClosingBraceSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Methods\MethodDeclarationSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Namespaces\NamespaceDeclarationSniff;
use PHP_CodeSniffer\Standards\PSR2\Sniffs\Namespaces\UseDeclarationSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\Classes\ValidClassNameSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\ControlStructures\ControlSignatureSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\ControlStructures\ForEachLoopDeclarationSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\ControlStructures\ForLoopDeclarationSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\ControlStructures\LowercaseDeclarationSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\Functions\FunctionDeclarationSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\Functions\LowercaseFunctionKeywordsSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\Functions\MultiLineFunctionDeclarationSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\Scope\MethodScopeSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\ControlStructureSpacingSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\ScopeClosingBraceSniff;
use PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\ScopeKeywordSpacingSniff;
use PhpCsFixer\Fixer\ArrayNotation\NoMultilineWhitespaceAroundDoubleArrowFixer;
use PhpCsFixer\Fixer\ArrayNotation\NormalizeIndexBraceFixer;
use PhpCsFixer\Fixer\ArrayNotation\NoTrailingCommaInSinglelineArrayFixer;
use PhpCsFixer\Fixer\ArrayNotation\NoWhitespaceBeforeCommaInArrayFixer;
use PhpCsFixer\Fixer\ArrayNotation\TrailingCommaInMultilineArrayFixer;
use PhpCsFixer\Fixer\ArrayNotation\TrimArraySpacesFixer;
use PhpCsFixer\Fixer\ArrayNotation\WhitespaceAfterCommaInArrayFixer;
use PhpCsFixer\Fixer\Basic\BracesFixer;
use PhpCsFixer\Fixer\Basic\EncodingFixer;
use PhpCsFixer\Fixer\Casing\LowercaseConstantsFixer;
use PhpCsFixer\Fixer\Casing\LowercaseKeywordsFixer;
use PhpCsFixer\Fixer\Casing\MagicConstantCasingFixer;
use PhpCsFixer\Fixer\Casing\NativeFunctionCasingFixer;
use PhpCsFixer\Fixer\CastNotation\CastSpacesFixer;
use PhpCsFixer\Fixer\CastNotation\LowercaseCastFixer;
use PhpCsFixer\Fixer\CastNotation\NoShortBoolCastFixer;
use PhpCsFixer\Fixer\CastNotation\ShortScalarCastFixer;
use PhpCsFixer\Fixer\ClassNotation\MethodSeparationFixer;
use PhpCsFixer\Fixer\ClassNotation\NoBlankLinesAfterClassOpeningFixer;
use PhpCsFixer\Fixer\ClassNotation\NoUnneededFinalMethodFixer;
use PhpCsFixer\Fixer\ClassNotation\ProtectedToPrivateFixer;
use PhpCsFixer\Fixer\ClassNotation\SelfAccessorFixer;
use PhpCsFixer\Fixer\ClassNotation\VisibilityRequiredFixer;
use PhpCsFixer\Fixer\Comment\HashToSlashCommentFixer;
use PhpCsFixer\Fixer\Comment\NoEmptyCommentFixer;
use PhpCsFixer\Fixer\Comment\NoTrailingWhitespaceInCommentFixer;
use PhpCsFixer\Fixer\ControlStructure\ElseifFixer;
use PhpCsFixer\Fixer\ControlStructure\IncludeFixer;
use PhpCsFixer\Fixer\ControlStructure\NoBreakCommentFixer;
use PhpCsFixer\Fixer\ControlStructure\NoTrailingCommaInListCallFixer;
use PhpCsFixer\Fixer\ControlStructure\NoUnneededControlParenthesesFixer;
use PhpCsFixer\Fixer\ControlStructure\NoUnneededCurlyBracesFixer;
use PhpCsFixer\Fixer\ControlStructure\SwitchCaseSemicolonToColonFixer;
use PhpCsFixer\Fixer\ControlStructure\SwitchCaseSpaceFixer;
use PhpCsFixer\Fixer\ControlStructure\YodaStyleFixer;
use PhpCsFixer\Fixer\FunctionNotation\FunctionDeclarationFixer;
use PhpCsFixer\Fixer\FunctionNotation\FunctionTypehintSpaceFixer;
use PhpCsFixer\Fixer\FunctionNotation\NativeFunctionInvocationFixer;
use PhpCsFixer\Fixer\FunctionNotation\NoSpacesAfterFunctionNameFixer;
use PhpCsFixer\Fixer\Import\NoUnusedImportsFixer;
use PhpCsFixer\Fixer\Import\OrderedImportsFixer;
use PhpCsFixer\Fixer\Import\SingleImportPerStatementFixer;
use PhpCsFixer\Fixer\Import\SingleLineAfterImportsFixer;
use PhpCsFixer\Fixer\LanguageConstruct\DeclareEqualNormalizeFixer;
use PhpCsFixer\Fixer\NamespaceNotation\BlankLineAfterNamespaceFixer;
use PhpCsFixer\Fixer\NamespaceNotation\NoLeadingNamespaceWhitespaceFixer;
use PhpCsFixer\Fixer\NamespaceNotation\SingleBlankLineBeforeNamespaceFixer;
use PhpCsFixer\Fixer\Operator\NewWithBracesFixer;
use PhpCsFixer\Fixer\Operator\ObjectOperatorWithoutWhitespaceFixer;
use PhpCsFixer\Fixer\Operator\PreIncrementFixer;
use PhpCsFixer\Fixer\Operator\StandardizeNotEqualsFixer;
use PhpCsFixer\Fixer\Operator\TernaryOperatorSpacesFixer;
use PhpCsFixer\Fixer\Operator\UnaryOperatorSpacesFixer;
use PhpCsFixer\Fixer\Phpdoc\NoBlankLinesAfterPhpdocFixer;
use PhpCsFixer\Fixer\Phpdoc\NoEmptyPhpdocFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocAnnotationWithoutDotFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocIndentFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocInlineTagFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocNoAccessFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocNoAliasTagFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocNoEmptyReturnFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocNoPackageFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocNoUselessInheritdocFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocScalarFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocSingleLineVarSpacingFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocToCommentFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocTrimFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocTypesFixer;
use PhpCsFixer\Fixer\Phpdoc\PhpdocVarWithoutNameFixer;
use PhpCsFixer\Fixer\PhpTag\FullOpeningTagFixer;
use PhpCsFixer\Fixer\PhpTag\NoClosingTagFixer;
use PhpCsFixer\Fixer\PhpUnit\PhpUnitFqcnAnnotationFixer;
use PhpCsFixer\Fixer\Semicolon\NoEmptyStatementFixer;
use PhpCsFixer\Fixer\Semicolon\NoSinglelineWhitespaceBeforeSemicolonsFixer;
use PhpCsFixer\Fixer\Semicolon\SemicolonAfterInstructionFixer;
use PhpCsFixer\Fixer\Semicolon\SpaceAfterSemicolonFixer;
use PhpCsFixer\Fixer\Strict\DeclareStrictTypesFixer;
use PhpCsFixer\Fixer\StringNotation\SingleQuoteFixer;
use PhpCsFixer\Fixer\Whitespace\IndentationTypeFixer;
use PhpCsFixer\Fixer\Whitespace\LineEndingFixer;
use PhpCsFixer\Fixer\Whitespace\NoSpacesAroundOffsetFixer;
use PhpCsFixer\Fixer\Whitespace\NoSpacesInsideParenthesisFixer;
use PhpCsFixer\Fixer\Whitespace\NoTrailingWhitespaceFixer;
use PhpCsFixer\Fixer\Whitespace\NoWhitespaceInBlankLineFixer;
use PhpCsFixer\Fixer\Whitespace\SingleBlankLineAtEofFixer;
use SlevomatCodingStandard\Sniffs\Classes\UnusedPrivateElementsSniff;
use SlevomatCodingStandard\Sniffs\Commenting\RequireOneLinePropertyDocCommentSniff;
use SlevomatCodingStandard\Sniffs\ControlStructures\RequireShortTernaryOperatorSniff;
use SlevomatCodingStandard\Sniffs\Exceptions\ReferenceThrowableOnlySniff;
use SlevomatCodingStandard\Sniffs\Functions\UnusedInheritedVariablePassedToClosureSniff;
use SlevomatCodingStandard\Sniffs\Operators\RequireCombinedAssignmentOperatorSniff;
use SlevomatCodingStandard\Sniffs\PHP\UselessParenthesesSniff;
use SlevomatCodingStandard\Sniffs\PHP\UselessSemicolonSniff;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $services = $containerConfigurator->services();

    $services->set(NamespaceDeclarationSniff::class);

    $services->set(UseDeclarationSniff::class);

    $services->set(ClassDeclarationSniff::class);

    $services->set(PropertyDeclarationSniff::class);

    $services->set(EndFileNewlineSniff::class);

    $services->set(ClosingTagSniff::class);

    $services->set(ControlStructureSpacingSniff::class);

    $services->set(SwitchDeclarationSniff::class);

    $services->set(ElseIfDeclarationSniff::class);

    $services->set(FunctionCallSignatureSniff::class);

    $services->set(MethodDeclarationSniff::class);

    $services->set(FunctionClosingBraceSniff::class);

    $services->set(ByteOrderMarkSniff::class);

    $services->set(ValidClassNameSniff::class);

    $services->set(UpperCaseConstantNameSniff::class);

    $services->set('PHP_CodeSniffer\Standards\Generic\Sniffs\Files\LineEndingsSniff')
        ->property('eolChar', 'n');

    $services->set('PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\SuperfluousWhitespaceSniff')
        ->property('ignoreBlankLines', true);

    $services->set(DisallowMultipleStatementsSniff::class);

    $services->set('PHP_CodeSniffer\Standards\Generic\Sniffs\WhiteSpace\ScopeIndentSniff')
        ->property('ignoreIndentationTokens', ['T_COMMENT', 'T_DOC_COMMENT_OPEN_TAG']);

    $services->set(DisallowTabIndentSniff::class);

    $services->set(LowerCaseKeywordSniff::class);

    $services->set(LowerCaseConstantSniff::class);

    $services->set(MethodScopeSniff::class);

    $services->set(ScopeKeywordSpacingSniff::class);

    $services->set(FunctionDeclarationSniff::class);

    $services->set(LowercaseFunctionKeywordsSniff::class);

    $services->set('PHP_CodeSniffer\Standards\Squiz\Sniffs\Functions\FunctionDeclarationArgumentSpacingSniff')
        ->property('equalsSpacing', 1);

    $services->set(ValidDefaultValueSniff::class);

    $services->set(MultiLineFunctionDeclarationSniff::class);

    $services->set(FunctionCallArgumentSpacingSniff::class);

    $services->set(ControlSignatureSniff::class);

    $services->set(ControlStructureSpacingSniff::class);

    $services->set(ScopeClosingBraceSniff::class);

    $services->set(ForEachLoopDeclarationSniff::class);

    $services->set(ForLoopDeclarationSniff::class);

    $services->set(LowercaseDeclarationSniff::class);

    $services->set(InlineControlStructureSniff::class);

    $services->set(EncodingFixer::class);

    $services->set(FullOpeningTagFixer::class);

    $services->set(BlankLineAfterNamespaceFixer::class);

    $services->set(BracesFixer::class);

    $services->set(ElseifFixer::class);

    $services->set(FunctionDeclarationFixer::class);

    $services->set(IndentationTypeFixer::class);

    $services->set(LineEndingFixer::class);

    $services->set(LowercaseConstantsFixer::class);

    $services->set(LowercaseKeywordsFixer::class);

    $services->set('PhpCsFixer\Fixer\FunctionNotation\MethodArgumentSpaceFixer')
        ->call('configure', [['ensure_fully_multiline' => true]]);

    $services->set(NoBreakCommentFixer::class);

    $services->set(NoClosingTagFixer::class);

    $services->set(NoSpacesAfterFunctionNameFixer::class);

    $services->set(NoSpacesInsideParenthesisFixer::class);

    $services->set(NoTrailingWhitespaceFixer::class);

    $services->set(NoTrailingWhitespaceInCommentFixer::class);

    $services->set(SingleBlankLineAtEofFixer::class);

    $services->set('PhpCsFixer\Fixer\ClassNotation\SingleClassElementPerStatementFixer')
        ->call('configure', [['elements' => ['property']]]);

    $services->set(SingleImportPerStatementFixer::class);

    $services->set(SingleLineAfterImportsFixer::class);

    $services->set(SwitchCaseSemicolonToColonFixer::class);

    $services->set(SwitchCaseSpaceFixer::class);

    $services->set(VisibilityRequiredFixer::class);

    $services->set(UnusedInheritedVariablePassedToClosureSniff::class);

    $services->set(UselessSemicolonSniff::class);

    $services->set(UselessParenthesesSniff::class);

    $services->set('PhpCsFixer\Fixer\ArrayNotation\ArraySyntaxFixer')
        ->call('configure', [['syntax' => 'short']]);

    $services->set(UnusedPrivateElementsSniff::class);

    $services->set(NoUnusedImportsFixer::class);

    $services->set(OrderedImportsFixer::class);

    $services->set(NoEmptyStatementFixer::class);

    $services->set(ProtectedToPrivateFixer::class);

    $services->set(NoUnneededControlParenthesesFixer::class);

    $services->set(NoUnneededCurlyBracesFixer::class);

    $services->set(RequireShortTernaryOperatorSniff::class);

    $services->set(RequireCombinedAssignmentOperatorSniff::class);

    $services->set('PhpCsFixer\Fixer\Operator\ConcatSpaceFixer')
        ->call('configure', [['spacing' => 'one']]);

    $services->set(NewWithBracesFixer::class);

    $services->set('PhpCsFixer\Fixer\Phpdoc\PhpdocAlignFixer')
        ->tag('param');

    $services->set(UnaryOperatorSpacesFixer::class);

    $services->set(CastSpacesFixer::class);

    $services->set(DeclareEqualNormalizeFixer::class);

    $services->set(FunctionTypehintSpaceFixer::class);

    $services->set(HashToSlashCommentFixer::class);

    $services->set(IncludeFixer::class);

    $services->set(LowercaseCastFixer::class);

    $services->set(MethodSeparationFixer::class);

    $services->set(NativeFunctionCasingFixer::class);

    $services->set(NoBlankLinesAfterClassOpeningFixer::class);

    $services->set(NoBlankLinesAfterPhpdocFixer::class);

    $services->set(NoEmptyCommentFixer::class);

    $services->set(NoEmptyPhpdocFixer::class);

    $services->set('PhpCsFixer\Fixer\Whitespace\NoExtraConsecutiveBlankLinesFixer')
        ->call('configure', [['curly_brace_block', 'extra', 'parenthesis_brace_block', 'square_brace_block', 'throw', 'use']]);

    $services->set(NoLeadingNamespaceWhitespaceFixer::class);

    $services->set(NoMultilineWhitespaceAroundDoubleArrowFixer::class);

    $services->set(NoShortBoolCastFixer::class);

    $services->set(NoSinglelineWhitespaceBeforeSemicolonsFixer::class);

    $services->set(NoSpacesAroundOffsetFixer::class);

    $services->set(NoTrailingCommaInListCallFixer::class);

    $services->set(NoTrailingCommaInSinglelineArrayFixer::class);

    $services->set(TrailingCommaInMultilineArrayFixer::class);

    $services->set(NoWhitespaceBeforeCommaInArrayFixer::class);

    $services->set(NoWhitespaceInBlankLineFixer::class);

    $services->set(NormalizeIndexBraceFixer::class);

    $services->set(ObjectOperatorWithoutWhitespaceFixer::class);

    $services->set(PhpdocAnnotationWithoutDotFixer::class);

    $services->set(PhpdocIndentFixer::class);

    $services->set(PhpdocInlineTagFixer::class);

    $services->set(PhpdocNoAccessFixer::class);

    $services->set(PhpdocNoEmptyReturnFixer::class);

    $services->set(PhpdocNoPackageFixer::class);

    $services->set(PhpdocNoUselessInheritdocFixer::class);

    $services->set(PhpdocScalarFixer::class);

    $services->set(PhpdocSingleLineVarSpacingFixer::class);

    $services->set(PhpdocToCommentFixer::class);

    $services->set(PhpdocTrimFixer::class);

    $services->set(PhpdocTypesFixer::class);

    $services->set(PhpdocVarWithoutNameFixer::class);

    $services->set(PreIncrementFixer::class);

    $services->set(SelfAccessorFixer::class);

    $services->set(ShortScalarCastFixer::class);

    $services->set(SingleQuoteFixer::class);

    $services->set(SpaceAfterSemicolonFixer::class);

    $services->set(StandardizeNotEqualsFixer::class);

    $services->set(TernaryOperatorSpacesFixer::class);

    $services->set(TrimArraySpacesFixer::class);

    $services->set(WhitespaceAfterCommaInArrayFixer::class);

    $services->set('PhpCsFixer\Fixer\ClassNotation\ClassDefinitionFixer')
        ->call('configure', [['single_line' => true]]);

    $services->set(MagicConstantCasingFixer::class);

    $services->set('PhpCsFixer\Fixer\Alias\NoMixedEchoPrintFixer')
        ->call('configure', [['use' => 'echo']]);

    $services->set(PhpUnitFqcnAnnotationFixer::class);

    $services->set(PhpdocNoAliasTagFixer::class);

    $services->set(SingleBlankLineBeforeNamespaceFixer::class);

    $services->set(NoUnneededFinalMethodFixer::class);

    $services->set(SemicolonAfterInstructionFixer::class);

    $services->set(YodaStyleFixer::class);

    $services->set('PhpCsFixer\Fixer\Alias\RandomApiMigrationFixer')
        ->call('configure', [['mt_rand' => 'random_int', 'rand' => 'random_int']]);

    $services->set(DeclareStrictTypesFixer::class);

    $services->set('PhpCsFixer\Fixer\FunctionNotation\ReturnTypeDeclarationFixer')
        ->call('configure', [['space_before' => 'none']]);

    $services->set(ReferenceThrowableOnlySniff::class);

    $services->set(RequireOneLinePropertyDocCommentSniff::class);

    $services->set('SlevomatCodingStandard\Sniffs\Commenting\DocCommentSpacingSniff')
        ->property('linesCountBeforeFirstContent', 0)
        ->property('linesCountBetweenDifferentAnnotationsTypes', 1);

    $services->set('PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\MemberVarSpacingSniff')
        ->property('spacing', 1)
        ->property('spacingBeforeFirst', 0);

    $services->set('PhpCsFixer\Fixer\Comment\HeaderCommentFixer')
        ->call('configure', [['header' => 'This file is part of the TYPO3 CMS project.

It is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License, either version 2
of the License, or any later version.

For the full copyright and license information, please read the
LICENSE.txt file that was distributed with this source code.

The TYPO3 project - inspiring people to share!', 'location' => 'after_declare_strict']]);

    $services->set(NativeFunctionInvocationFixer::class);

    $parameters = $containerConfigurator->parameters();

    $parameters->set('skip', ['PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\ControlStructureSpacingSniff.SpacingAfterOpenBrace' => null, 'PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\ControlStructureSpacingSniff.SpaceBeforeCloseBrace' => null, 'PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\ControlStructureSpacingSniff.LineAfterClose' => null, 'PHP_CodeSniffer\Standards\Squiz\Sniffs\WhiteSpace\ControlStructureSpacingSniff.NoLineAfterClose' => null, 'PHP_CodeSniffer\Standards\PSR2\Sniffs\Methods\FunctionCallSignatureSniff.OpeningIndent' => null]);
};
