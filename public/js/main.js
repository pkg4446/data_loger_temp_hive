if(localStorage.getItem('user')==null || localStorage.getItem('token')==null){
    window.location.href = '/web/login';
}else if(localStorage.getItem('device') === null){
    window.location.href = '/web/select';
}else{
    const userid    = localStorage.getItem('user');
    const token     = localStorage.getItem('token');
    const device    = localStorage.getItem('device');
    const date_now  = new Date();
}