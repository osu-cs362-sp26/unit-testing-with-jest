/*
 * This test implements a unit testing antipattern by including logic in the
 * testing code.  Here, the logic is very simple, just the contatenation of
 * two strings: baseUrl + path.  However, the result of this concatenation
 * could potentially introduce a bug by encoding the expectation that the
 * correct URL contains two slashes: "http://www.example.com//about".  If we
 * assume the Navigator class correctly ensures URLs don't have double slashes,
 * then this test will actually fail when the Navigator class behaves
 * correctly.
 *
 * Even though the logic is very simple, the bug it introduces is one we might
 * easily miss without careful consideration of the test.
 *
 * Inspired by the test here:
 *
 *   https://abseil.io/resources/swe-book/html/ch12.html#donapostrophet_put_logic_in_tests
 */
test("Navigator generates correct URL when navigating to /about", function () {
    const baseUrl = "http://www.example.com/"
    const path = "/about"
    const nav = new Navigator(baseUrl)
    nav.goTo(path)
    expect(nav.url()).toBe(baseUrl + path)
})


/*
 * The next two tests implement a different unit testing antipattern by
 * factoring repeated logic into helper functions, resulting in tests that
 * are too DRY.  This adds complexity to the tests and makes it hard to easily
 * understand exactly what thet are doing, since it forces us to track down
 * the definitions of the helper functions.  This, in turn, can potentially
 * turn these tests into a maintenance burden.
 *
 * Inspired by the tests here:
 *
 *   https://abseil.io/resources/swe-book/html/ch12.html#tests_and_code_sharing_dampcomma_not_dr
 */
test("chat room allows multiple users to register", function () {
    const users = createUsers([ false, false ])
    const chatroom = createChatroomAndRegisterUsers(users)
    validateChatroomAndUsers(chatroom, users)
})

test("chat room does not allow a banned user to register", function () {
    const users = createUsers([ true ])
    const chatroom = createChatroomAndRegisterUsers(users)
    validateChatroomAndUsers(chatroom, users)
})

/*
 * Imagine there are hundreds of lines of tests here between the tests above
 * and the helper functions below...
 * ...
 * ...
 * ...
 * ...
 * ...
 */

function createUsers(isBannedValues) {
    const users = []
    isBannedValues.forEach(function (isBanned) {
        users.push(new User(isBanned ? User.BANNED : User.NORMAL))
    })
    return users
}

function createChatroomAndRegisterUsers(users) {
    const chatroom = new Chatroom()
    users.forEach(function (user) {
        try {
            chatroom.register(user)
        } catch (e) {
            /* ignore BannedUserError */
        }
    })
    return chatroom
}

function validateChatroomAndUsers(chatroom, users) {
    expect(chatroom.isReachable()).toBeTruthy()
    users.forEach(function (user) {
        expect(chatroom.hasRegisteredUser(user)).toBe(user.state !== User.BANNED)
    })
}
