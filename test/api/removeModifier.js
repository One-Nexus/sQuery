const TEMPLATE = (`
    <div class="foo-alpha-beta foo-pancake foo-hot-spicy test" id="SVRNE">
        <div class="foo_bar-alpha-beta foo_bar-qux foo-bar-hot-spicy" id="HH156">
            <div class="foo_bar_fizz-alpha-beta foo_bar_fizz-buzz foo_bar_fizz-hot-spicy foo_bar_fizz-ginger" id="A0BG9"></div>
            <div class="foo_beta" id="HRJM1"></div>
            <div class="alpha-ginger alpha-hot-spicy" id="E0RZS">
                <div class="alpha_beta-qux alpha_beta-hot-spicy" id="TKLD4"></div>
            </div>
        </div>
        <div class="foo_qux-qux foo_qux-hot-spicy" id="FH5FN">
            <div class="foo_qux_fizz-hot-spicy foo_qux_fizz-ginger" id="EI7RQ">
                <div class="foo_qux_fizz_buzz-hot-spicy foo_qux_fizz_buzz-ginger" id="M1FAC"></div>
            </div>
        </div>
        <div class="foo_bar-qux" id="KJ4PM"></div>
        <div class="alpha-ginger" id="HY7S3"></div>
    </div>
`);

document.body.innerHTML = TEMPLATE;

let EL, ELS;

/**
 * @note - instead of `addModifier`, these tests will use `modifier` in
 * conjunction with a `remove` parameter, to prevent superfluous tests
 */
describe('sQuery `modifier` API', () => {
    beforeEach('setup DOM', () => {
        document.body.innerHTML = TEMPLATE;
    });

    it('should exist', () => {
        assert.equal(typeof sQuery().remove, 'function');
        assert.equal(typeof sQuery().removeModifier, 'function');
        assert.equal(typeof sQuery().modifier, 'function');
    });

    describe('when used to remove a single modifier', () => {
        describe('from a single module', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('SVRNE');

                sQuery().modifier(EL, 'pancake', 'remove');
            });

            it('should correctly remove the modifier to the module', () => {
                assert(!EL.classList.contains('foo-pancake'));
            });
        });

        describe('from a single component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('HH156');  

                sQuery().modifier(EL, 'qux', 'remove');  
            });

            it('should correctly remove the modifier to the component', () => {
                assert(!EL.classList.contains('foo_bar-qux'));
            });
        });

        describe('from a single sub-component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('A0BG9');

                sQuery().modifier(EL, 'buzz', 'remove');
            });

            it('should correctly remove the modifier to the sub-component', () => {
                assert(!EL.classList.contains('foo_bar_fizz-buzz'));
            });
        });

        describe('from multiple modules', () => {
            beforeEach('setup DOM', () => {
                ELS = document.querySelectorAll('#E0RZS, #HY7S3');

                sQuery().modifier(ELS, 'ginger', 'remove');
            });

            it('should correctly remove the modifier to the modules', () => {
                assert([...ELS].every(EL => !EL.classList.contains('alpha-ginger')));
            });
        });

        describe('from multiple components', () => {
            describe('that are the same component', () => {
                beforeEach('setup DOM', () => {
                    ELS = document.querySelectorAll('#HH156, #KJ4PM');

                    sQuery().modifier(ELS, 'qux', 'remove');
                });

                it('should correctly remove the modifier from the components', () => {
                    assert([...ELS].every(EL => !EL.classList.contains('foo_bar-qux')));
                });
            });

            describe('that are different components', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#HH156, #FH5FN'), 'qux', 'remove');
                });

                it('should correctly remove the modifier from the components', () => {
                    assert(!document.getElementById('HH156').classList.contains('foo_bar-qux'));
                    assert(!document.getElementById('FH5FN').classList.contains('foo_qux-qux'));
                });
            });

            describe('that are different components of different modules', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#HH156, #TKLD4'), 'qux', 'remove');
                });

                it('should correctly remove the modifier from the components', () => {
                    assert(!document.getElementById('HH156').classList.contains('foo_bar-qux'));
                    assert(!document.getElementById('TKLD4').classList.contains('alpha_beta-qux'));
                });
            });
        });

        describe('from multiple sub-components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#A0BG9, #EI7RQ, #M1FAC'), 'ginger', 'remove');
            });

            it('should correctly remove the modifier from the sub-components', () => {
                assert(!document.getElementById('A0BG9').classList.contains('foo_bar_fizz-ginger'));
                assert(!document.getElementById('EI7RQ').classList.contains('foo_qux_fizz-ginger'));
                assert(!document.getElementById('M1FAC').classList.contains('foo_qux_fizz_buzz-ginger'));
            });
        });
    });

    describe('when used to reove multiple modifiers', () => {
        describe('from a single module', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('SVRNE');

                sQuery().modifier(EL, ['alpha', 'beta'], 'remove');
            });

            it('should correctly remove the modifiers from the module', () => {
                assert(!EL.classList.contains('foo-alpha-beta'));
            });
        });

        describe('from a single component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('HH156');

                sQuery().modifier(EL, ['alpha', 'beta'], 'remove');
            });

            it('should correctly remove the modifiers from the component', () => {
                assert(!EL.classList.contains('foo_bar-alpha-beta'));
            });
        });

        describe('from a single sub-component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('A0BG9');

                sQuery().modifier(EL, ['alpha', 'beta'], 'remove');
            });

            it('should correctly remove the modifiers from the sub-component', () => {
                assert(!EL.classList.contains('foo_bar_fizz-alpha-beta'));
            });
        });

        describe('from multiple modules', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#SVRNE, #E0RZS'), ['hot', 'spicy'], 'remove');
            });

            it('should correctly remove the modifiers from the modules', () => {
                assert(!document.getElementById('SVRNE').classList.contains('foo-hot-spicy'));
                assert(!document.getElementById('E0RZS').classList.contains('alpha-hot-spicy'));
            });
        });

        describe('from multiple components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#HH156, #FH5FN, #TKLD4'), ['hot', 'spicy'], 'remove');
            });

            it('should correctly remove the modifiers from the components', () => {
                assert(!document.getElementById('HH156').classList.contains('foo_bar-hot-spicy'));
                assert(!document.getElementById('FH5FN').classList.contains('foo_qux-hot-spicy'));
                assert(!document.getElementById('TKLD4').classList.contains('alpha_beta-hot-spicy'));
            });
        });

        describe('from multiple sub-components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#A0BG9, #EI7RQ, #M1FAC'), ['hot', 'spicy'], 'remove');
            });

            it('should correctly remove the modifiers from the sub-components', () => {
                assert(!document.getElementById('A0BG9').classList.contains('foo_bar_fizz-hot-spicy'));
                assert(!document.getElementById('EI7RQ').classList.contains('foo_qux_fizz-hot-spicy'));
                assert(!document.getElementById('M1FAC').classList.contains('foo_qux_fizz_buzz-hot-spicy'));
            });
        });
    });
});