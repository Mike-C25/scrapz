// fetch('https://weather.com/weather/tenday/l/08807:4:US')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));


($(document).ready(function() {

    $('.submit-btn').on('click', function() {
        var zip = $('#zip').val();
        var isnum = /^\d+$/.test(zip);
        // console.log(zip, zip.length, isnum);

        //if pass validation
        if (zip.length === 5 && isnum) {
            console.log('Requesting Scrape...');
            console.log(zip);
            $.ajax({
                    method: "POST",
                    url: "/weather/" + zip
                })
                .done(function(data) {
                    if (data) {
                        console.log('Scrape Success!')
                        $('#zip').val('');
                    }
                    console.log("Redirection. You can't see this.")
                    window.location.href = "/weather/" +zip;
                    // $.ajax({
                    //         method: "GET",
                    //         url: "/weather/" + zip
                    //     })
                    //     .done(function(data){

                    //     	if(data){
                    //     		console.log(data)

                    //     	}
                    //     })
                });

        } else {
            console.log("nah dude put a valid zip code");
        }
    });
}));