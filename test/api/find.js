const TEMPLATE = (`
    <div class="foo foo-pancake test" id="SVRNE">
        <div class="foo_fizz" id="HH156"></div>
        <div class="foo_fizz-buzz" id="A0BG9"></div>

        <div class="alpha" id="HY7S3">
            <div class="alpha_beta" id="ZSAE6"></div>
            <div class="alpha_fizz-buzz" id="N1WY1"></div>
            <div class="alpha_fizz" id="TKLD4"></div>
        </div>

        <div class="alpha-beta" id="SW420"></div>
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
            it('should retreive the desired modules', () => {
                assert(NodeListsAreEqual(
                    sQuery().find(document.getElementById('SVRNE'), { module: 'alpha' }),
                    document.querySelectorAll('#HY7S3, #SW420')
                ));
            });

            describe('and a `component` key', () => {
                it('should retreive the desired components', () => {
                    assert(NodeListsAreEqual(
                        sQuery().find(document.getElementById('SVRNE'), { module: 'alpha', component: 'beta' }),
                        document.querySelectorAll('#ZSAE6')
                    ));

                    assert(NodeListsAreEqual(
                        sQuery().find(document.getElementById('SVRNE'), { module: 'alpha', component: 'fizz' }),
                        document.querySelectorAll('#N1WY1, #TKLD4')
                    ));
                });

                describe('and a `modifier` key', () => {
                    it('that have the specified modifier', () => {
                        assert(NodeListsAreEqual(
                            sQuery().find(document.getElementById('SVRNE'), { 
                                module: 'alpha', 
                                component: 'fizz',
                                modifier: 'buzz'
                            }),
                            document.querySelectorAll('#N1WY1')
                        ));
                    });
                });
            });

            describe('and a `modifier` key', () => {
                it('should retreive the desired modules that have the specified modifier', () => {
                    assert(NodeListsAreEqual(
                        sQuery().find(document.getElementById('SVRNE'), { module: 'alpha', modifier: 'beta' }),
                        document.querySelectorAll('#SW420')
                    ));
                });
            });
        });

        describe('with a `component` key', () => {
            it('should retreive the desired components', () => {
                assert(NodeListsAreEqual(
                    sQuery().find(document.getElementById('SVRNE'), { component: 'fizz' }),
                    document.querySelectorAll('#HH156, #A0BG9')
                ));
            });

            describe('and a `modifier` key', () => {
                it('that have the specified modifier', () => {
                    assert(NodeListsAreEqual(
                        sQuery().find(document.getElementById('SVRNE'), { component: 'fizz', modifier: 'buzz' }),
                        document.querySelectorAll('#A0BG9')
                    ));
                });
            });
        });
    });

    describe('When `query` is a string', () => {
        describe('to find a module', () => {
            it('should retreive the desired modules', () => {
                assert(NodeListsAreEqual(
                    sQuery().find(document.getElementById('SVRNE'), 'alpha'),
                    document.querySelectorAll('#HY7S3, #SW420')
                ));
            });
        });

        describe('to find a component', () => {
            it('should retreive the desired components', () => {
                // sQuery().find(document.getElementById('SVRNE'), 'fizz').forEach(c => console.log(c.id))
                assert(NodeListsAreEqual(
                    sQuery().find(document.getElementById('SVRNE'), 'fizz'),
                    document.querySelectorAll('#HH156, #A0BG9')
                ));
            });
        });
    });
});