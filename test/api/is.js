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
        assert.equal(typeof sQuery().is, 'function');
    });

    describe('When `query` is an object', () => {
        describe('with a `module` key', () => {
            it('should determine if the given element is the specified module', () => {
                assert(sQuery().is(document.getElementById('SVRNE'), { module: 'foo' }));
                assert(!sQuery().is(document.getElementById('HH156'), { module: 'foo' }));
            });

            describe('and a `component` key', () => {
                it('should determine if the given element is the specified component', () => {
                    assert(sQuery().is(document.getElementById('HH156'), { module: 'foo', component: 'fizz' }));
                    assert(!sQuery().is(document.getElementById('TKLD4'), { module: 'foo', component: 'fizz' }));
                });
    
                describe('and a `modifier` key', () => {
                    it('should determine if the given element is the specified component', () => {
                        assert(sQuery().is(document.getElementById('A0BG9'), { 
                            module: 'foo', 
                            component: 'fizz',
                            modifier: 'buzz'
                        }));
    
                        assert(!sQuery().is(document.getElementById('N1WY1'), { 
                            module: 'foo', 
                            component: 'fizz',
                            modifier: 'buzz'
                        }));
    
                        assert(sQuery().is(document.getElementById('N1WY1'), { 
                            module: 'alpha', 
                            component: 'fizz',
                            modifier: 'buzz'
                        }));
                    });
                });
            });

            describe('and a `modifier` key', () => {
                it('should determine if the given element is the specified module', () => {
                    assert(sQuery().is(document.getElementById('SVRNE'), { module: 'foo', modifier: 'pancake' }));
                    assert(!sQuery().is(document.getElementById('SVRNE'), { module: 'foo', modifier: 'test' }));
                });
            });
        });

        describe('with a `component` key', () => {
            it('should determine if the given element is the specified component', () => {
                assert(sQuery().is(document.getElementById('HH156'), { component: 'fizz' }));
                assert(sQuery().is(document.getElementById('TKLD4'), { component: 'fizz' }));
                assert(sQuery().is(document.querySelectorAll('#HH156, #TKLD4'), { component: 'fizz' }));
                assert(!sQuery().is(document.getElementById('ZSAE6'), { component: 'fizz' }));
            });

            describe('and a `modifier` key', () => {
                it('should determine if the given element is the specified component', () => {
                    assert(sQuery().is(document.getElementById('A0BG9'), { 
                        component: 'fizz', 
                        modifier: 'buzz' 
                    }));

                    assert(sQuery().is(document.getElementById('N1WY1'), { 
                        component: 'fizz', 
                        modifier: 'buzz' 
                    }));
                });
            });
        });

        describe('with a `modifier` key', () => {
            it('should determine if the given element is the specified component', () => {
                assert(sQuery().is(document.getElementById('SVRNE'), {  modifier: 'pancake' }));
                assert(sQuery().is(document.getElementById('A0BG9'), {  modifier: 'buzz' }));
                assert(!sQuery().is(document.getElementById('A0BG9'), {  modifier: 'foo' }));
            });
        });
    });

    describe('When `query` is a string', () => {
        describe('to test for a module', () => {
            it('should determine if the given element is the specified module', () => {
                assert(sQuery().is(document.getElementById('SVRNE'), 'foo'));
                assert(!sQuery().is(document.getElementById('SVRNE'), 'alpha'));
                assert(!sQuery().is(document.getElementById('HH156'), 'foo'));
            });
        });

        describe('to test for a component', () => {
            it('should determine if the given element is the specified component', () => {
                assert(sQuery().is(document.getElementById('HH156'), 'fizz'));
                assert(sQuery().is(document.getElementById('ZSAE6'), 'beta'));
                assert(!sQuery().is(document.getElementById('ZSAE6'), 'alpha'));
            });
        }); 

        describe('to test for a modifier', () => {
            it('should determine if the given element has the specified modifier', () => {
                assert(sQuery().is(document.getElementById('SVRNE'), 'pancake'));
                assert(sQuery().is(document.getElementById('A0BG9'), 'buzz'));
                assert(!sQuery().is(document.getElementById('A0BG9'), 'foo'));
            });
        });  
    });
});