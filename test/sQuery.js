const TEMPLATE = (`
    <div class="foo foo-pancake test" id="SVRNE">
        <div class="fizz" id="HH156"></div>
        <div class="fizz" id="A0BG9"></div>

        <div class="alpha" id="HY7S3">
            <div class="fizz" id="ZSAE6"></div>
            <div class="fizz" id="N1WY1"></div>
        </div>
    </div>

    <div class="alpha-buzz" id="KJ4PM">
        <div class="fizz" id="M1FAC"></div>
        <div class="fizz" id="EI7RQ"></div>
    </div>

    <div class="foo_bar" id="SW420"></div>
`);

document.body.innerHTML = TEMPLATE;

let EL, ELS;

describe('sQuery function', () => {
    beforeEach('setup DOM', () => {
        document.body.innerHTML = TEMPLATE;
    });

    it('should exist', () => {
        assert.equal(typeof sQuery, 'function');
    });

    describe('invoked with custom namespace', () => {
        it('should retreive expected DOM nodes', () => {
            assert(NodeListsAreEqual(
                sQuery(document.body).getComponents('bar', { namespace: 'foo' }),
                document.querySelectorAll('#SW420')
            ));
        });
    });

    describe('invoked with NodeList', () => {
        it('should retreive expected DOM nodes', () => {
            assert(NodeListsAreEqual(
                sQuery(document.querySelectorAll('.fizz')).nodes,
                document.querySelectorAll('.fizz')
            ));
        });
    });

    describe('invoked with HTMLElement', () => {
        it('should retreive expected DOM nodes', () => {
            assert(NodeListsAreEqual(
                sQuery(document.getElementById('HH156')).node,
                document.getElementById('HH156')
            ));
        });
    });

    describe('invoked with Array', () => {
        it('should retreive expected DOM nodes', () => {
            assert(NodeListsAreEqual(
                sQuery(['.fizz']).nodes,
                document.querySelectorAll('.fizz')
            ));
        });
    });

    describe('invoked with Object', () => {
        it('should retreive expected DOM nodes', () => {
            assert(NodeListsAreEqual(
                sQuery({ name: 'fizz' }).nodes,
                document.querySelectorAll('.fizz')
            ));
        });
    });

    describe('invoked with invalid selector', () => {
        it('should retreive expected DOM nodes', () => {
            assert(!sQuery('$').nodes);
        });
    });

    describe('invoked with callback function', () => {
        beforeEach('initiate callback', () => {
            sQuery('.fizz', el => el.classList.add('lorem'));
        });

        it('should call the callback function', () => {
            assert(document.getElementById('HH156').classList.contains('lorem'));
        });
    });

    describe('invoked and then use API', () => {
        it('should call the callback function', () => {
            assert(sQuery('#KJ4PM').hasModifier('buzz'));
        });
    });
});