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
        assert.equal(typeof sQuery().isModule, 'function');
        assert.equal(typeof sQuery().getModules, 'function');
        assert.equal(typeof sQuery().module, 'function');
    });

    describe('when used without `operator` parameter', () => {
        describe('on a single module', () => {
            it('should find all specified child modules', () => {
                assert(NodeListsAreEqual(
                    sQuery(document.getElementById('SVRNE')).module('fizz'),
                    document.querySelectorAll('#HH156, #A0BG9, #ZSAE6, #N1WY1')
                ));
            });
        });

        describe('on multiple modules', () => {
            it('should find all specified child modules', () => {
                assert(NodeListsAreEqual(
                    sQuery(document.querySelectorAll('#SVRNE, #HY7S3')).module('fizz'),
                    document.querySelectorAll('#HH156, #A0BG9, #ZSAE6, #N1WY1')
                ));
            });
        });
    });

    describe('when used with `is` operator', () => {
        it('should determine if element is the specified module', () => {
            assert(sQuery(document.getElementById('SVRNE')).module('foo', 'is'));
            assert(sQuery(document.getElementById('HH156')).module('fizz', 'is'));
            assert(!sQuery(document.getElementById('SVRNE')).module('fizz', 'is'));
            assert(!sQuery(document.getElementById('HH156')).module('foo', 'is'));
        });
    });

    describe('when used with a callback operator', () => {
        beforeEach('setup DOM', () => {
            EL = document.getElementById('SVRNE');

            sQuery().module(EL, 'fizz', node => node.className = 'success');
        });

        it('should execute the callback on each node', () => {
            assert(document.getElementById('HH156').className = 'success');
            assert(document.getElementById('A0BG9').className = 'success');
        });
    });
});