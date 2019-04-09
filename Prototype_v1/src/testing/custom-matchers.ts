/* tslint:disable only-arrow-functions */

import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

export const customJasmineMatchers: CustomMatcherFactories = {
    toHaveCssClass(util: MatchersUtil, customEqualityTester: CustomEqualityTester[]): CustomMatcher {
        return { compare: buildError(false), negativeCompare: buildError(true) };

        function buildError(isNot: boolean) {
            return (actual: HTMLElement, className: string): CustomMatcherResult => {
                return {
                    pass: actual.classList.contains(className) === !isNot,
                    message: `Expected ${actual.outerHTML} ${
                        isNot ? 'not ' : ''
                    }to contain the CSS class "${className}"`
                };
            };
        }
    }
};

// custom matchers, see https://stackoverflow.com/a/44996479
