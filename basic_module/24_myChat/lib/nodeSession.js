 let sessions = [],//Blank object literal
    start = (req, res) => {
        conn = { res: res, req: req };
        cookies = {};
        if(typeof conn.req.headers.cookie !== "undefined") {
            conn.req.headers.cookie.split(';').forEach(function( cookie ) {
                let parts = cookie.split('=')
                cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim()
            });//Grab all cookies, and parse them into properties of the cookies object
        } else {
            cookies.SESSID = 0
        }
        let SESSID = cookies.SESSID//Get current SESSID
        if(typeof sessions[SESSID] !== "undefined") {
            session = sessions[SESSID]
            if(session.expires < Date()) {//If session is expired
                delete sessions[SESSID]
                return newSession(conn.res)
            } else {
                let dt = new Date()
                dt.setMinutes(dt.getMinutes() + 30)
                session.expires = dt//Reset session expiration
                return sessions[SESSID]
            }
        } else {
            return newSession(conn.res)
        }
    };
function newSession(res) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
        SESSID = '';
	for (let i = 0; i < 40; i++) {
		let rnum = Math.floor(Math.random() * chars.length)
		SESSID += chars.substring(rnum,rnum + 1)
	}//Generate a 40 char random string for session id
    
    if(typeof sessions[SESSID] !== "undefined") {
        return newSession(res)//Avoid duplicate sessions
    }
    let dt = new Date()
    dt.setMinutes(dt.getMinutes() + 30)
    let session = { //Session literal object
        SESSID: SESSID,
        expires: dt
    }
    sessions[SESSID] = session//Store it for future requests
    res.setHeader('Set-Cookie', 'SESSID=' + SESSID)
    return session
           
}

function cleanSessions() {
    for(sess in sessions) {
        if(sess.expires < Date()) {//If expired
            delete sessions[sess.SESSID]
        }
    }
}

 
 exports.start = start