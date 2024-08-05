localStorage.removeItem('user');
localStorage.removeItem('token');
localStorage.removeItem('device');

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3002/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id:     username,
            pass:   password
        })
    })
    .then(response => {
        response.status
        if (response.status==400) {
            throw new Error('아이디 또는 비밀번호가 누락됐습니다.');
        }else if (response.status==403) {
            throw new Error('비밀번호가 다릅니다.');
        }else if (response.status==406) {
            throw new Error('아이디가 없습니다.');
        }
        return response.text(); // JSON 대신 텍스트로 응답을 읽습니다.
    })
    .then(data => {
        if (data != "nodata" && data != "password" && data != "userid") {
            alert('로그인 성공!');
            localStorage.setItem('user', username);
            localStorage.setItem('token', data);
            window.location.href = '/web';
        } else {
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
    });
});