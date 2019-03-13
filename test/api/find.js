const TEMPLATE = (`
    <div class="foo foo-pancake test" id="SVRNE">
        <div class="fizz" id="HH156"></div>
        <div class="fizz" id="A0BG9"></div>

        <div class="alpha" id="HY7S3">
            <div class="fizz" id="ZSAE6"></div>
            <div class="fizz" id="N1WY1"></div>
        </div>
    </div>

    <div class="alpha" id="KJ4PM">
        <div class="fizz" id="M1FAC"></div>
        <div class="fizz" id="EI7RQ"></div>
    </div>
`);

document.body.innerHTML = TEMPLATE;

let EL, ELS;

describe('sQuery `component` API', () => {
    beforeEach('setup DOM', () => {
        document.body.innerHTML = TEMPLATE;
    });

    it('should exist', () => {
        assert.equal(typeof sQuery().find, 'function');
    });

    describe('When `query` is an object', () => {
        describe('with a `module` key', () => {
            it('', () => {
                assert(NodeListsAreEqual());
            });

            describe('and a `component` key', () => {
                it('', () => {
                    assert();
                });

                describe('and a `modifier` key', () => {
                    it('', () => {
                        assert();
                    });
                });
            });

            describe('and a `modifier` key', () => {
                it('', () => {
                    assert();
                });
            });
        });

        describe('with a `component` key', () => {
            it('', () => {
                assert();
            });

            describe('and a `modifier` key', () => {
                it('', () => {
                    assert();
                });
            });
        });
    });

    describe('When `query` is a string', () => {
        describe('to find a module', () => {
            it('', () => {
                assert();
            });
        });

        describe('to find a component', () => {
            it('', () => {
                assert();
            });
        });
    });
});