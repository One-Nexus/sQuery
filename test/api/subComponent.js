const TEMPLATE = (`
    <div class="foo foo-pancake test" id="SVRNE">
        <div class="foo_bar" id="HH156">
            <div class="foo_bar_fizz" id="A0BG9">
                <div class="foo_bar_fizz_buzz" id="M1FAC"></div>
                <div class="foo_bar_fizz_buzz" id="FH5FN"></div>
                <div class="alpha" id="E0RZS">
                    <div class="alpha_beta" id="TKLD4">
                        <div class="alpha_beta_fizz" id="BB99G"></div>
                        <div class="alpha_beta_fizz" id="SW420"></div>
                    </div>
                </div>
            </div>
            <div class="foo_bar_fizz" id="N1WY1"></div>
            <div class="foo_bar_fizz" id="ZSAE6"></div>
            <div class="alpha" id="HY7S3"></div>
        </div>
        <div class="foo_bar" id="KJ4PM">
            <div class="foo_bar_qux" id="VQTLX">
            <div class="foo_beta" id="HRJM1"></div>
        </div>
    </div>
`);

document.body.innerHTML = TEMPLATE;

let EL, ELS;

describe('sQuery `subComponent` API', () => {
    beforeEach('setup DOM', () => {
        document.body.innerHTML = TEMPLATE;
    });

    it('should exist', () => {
        assert.equal(typeof sQuery().getSubComponent, 'function');
        assert.equal(typeof sQuery().getSubComponents, 'function');
        assert.equal(typeof sQuery().subComponent, 'function');
    });

    describe('when used without `subComponentName` and `operator` parameters', () => {
        describe('on a single component', () => {
            it('should find all child sub-components', () => {
                assert(NodeListsAreEqual(
                    sQuery().subComponent(document.getElementById('HH156')),
                    document.querySelectorAll('#A0BG9, #N1WY1, #ZSAE6')
                ));
            });
        });

        describe('on multiple components', () => {
            it('should find all child sub-components', () => {
                assert(NodeListsAreEqual(
                    sQuery().subComponent(document.querySelectorAll('#HH156, #KJ4PM')),
                    document.querySelectorAll('#A0BG9, #N1WY1, #ZSAE6, #VQTLX')
                ));
            });
        });
    });

    describe('when used with `first` operator', () => {
        describe('on a single module', () => {
            it('should find all specified child sub-components', () => {
                assert.equal(
                    sQuery().subComponent(document.getElementById('HH156'), 'fizz', 'first'),
                    document.getElementById('A0BG9')
                );
            });
        });

        describe('on multiple modules', () => {
            it('should find all specified child sub-components', () => {
                assert(NodeListsAreEqual(
                    sQuery().subComponent(document.querySelectorAll('#HH156, #TKLD4'), 'fizz', 'first'),
                    document.querySelectorAll('#A0BG9, #BB99G')
                ));
            });
        });
    });
});