$(document).ready(function (){
    $("#hide_prix").click(function(){
        $("#table_prix").toggle(300)

    });

});


function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }


$(document).ready(function (){
    $("#popup_id").click(function(){
        $(".course_information").toggle()

    });

});




function myFunction2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("show");
  }


$(document).ready(function (){
    $("#popup_id2").click(function(){
        $("#bande_annance").toggle(300)

    });

});





$(document).ready(function (){
    $("#create_chapter").click(function(){
        $("#show_create_chapter").show(300)

    });

});

//x_buton
$(document).ready(function (){
    $("#x_button").click(function(){
        $("#show_create_chapter").hide(300)

    });

});



////////////////////////////////
function lesson_add_button_show(x) {
    $("#show_add_new_lesson").show(0)
}
/////////////////////////////////

$(document).ready(function (){
    $("#lesson_hover").mouseenter(function(){
        $(this).css({
            "color":"#FF7244",
        })
        $("#lesson_hover_v1").css({
            "color":"#FF7244",

    })

    });
});
$(document).ready(function (){
    $("#lesson_hover").mouseleave(function(){
        $(this).css({
            "color":"#551a8b",
        })
        $("#lesson_hover_v1").css({
            "color":"#551a8b",
        })

    });
});

$(document).ready(function (){
    $("#lesson_hover_v1").mouseenter(function(){
        $(this).css({
            "color":"#FF7244",
    })
        $("#lesson_hover").css({
            "color":"#FF7244",
    })

    });
});
$(document).ready(function (){
    $("#lesson_hover_v1").mouseleave(function(){
        $(this).css({
            "color":"#551a8b",
    })
        $("#lesson_hover").css({
            "color":"#551a8b",
    })

    });
});



//my device button hover
$(document).ready(function (){
    $("#my_device_icon").mouseenter(function(){
        $(this).css({
            "width":"29px",
            "height":"29px"
        })
        $("#my_device").css({
            "color":"#FF7244",
            "font-size": "1.8rem"
        })
        $("#my_device_icon_color").css({
            fill:"#FF7244"
        })

    });
});
$(document).ready(function (){
    $("#my_device_icon").mouseleave(function(){
        $(this).css({
            "width":"26px",
            "height":"26px"
        })
        $("#my_device").css({
            "color":"#525252",
            "font-size": "1.6rem"
        })
        $("#my_device_icon_color").css({
            fill:"#2275D7"
        })

    });
});
//////////////
$(document).ready(function (){
    $("#my_device").mouseenter(function(){
        $("#my_device_icon").css({
            "width":"29px",
            "height":"29px"
        })
        $(this).css({
            "color":"#FF7244",
            "font-size": "1.8rem"
        })
        $("#my_device_icon_color").css({
            fill:"#FF7244"
        })

    });
});
$(document).ready(function (){
    $("#my_device").mouseleave(function(){
        $("#my_device_icon").css({
            "width":"26px",
            "height":"26px"
        })
        $(this).css({
            "color":"#525252",
            "font-size": "1.6rem"
        })
        $("#my_device_icon_color").css({
            fill:"#2275D7"
        })

    });
});
//my device button hover

//select option :video/quiz

function lesson_select_option(x){

    $("#select_option"+ x).change(function(){
        var val = $(this).val();
        if(val == "video" ){
            $("#quiz_add_comment"+ x).hide()
            $("#drop_video"+ x).show(300)   
        }
        if(val == "quiz" ){
            $("#drop_video"+ x).hide()
            $("#quiz_add_comment"+ x).show(300)
        }
    });
}


//show lesson
/*
$(document).ready(function (){
    $("#lesson_hover_v1").click(function(){
        $("#show_add_new_lesson").show(300)

    });

});
*/
//hide lesson
function lesson_add_x_button(x){
        $("#show_add_new_lesson"+x).hide(0)
}

//hide update lesson
function lesson_update_x_button(x){
        $("#show_update_lesson"+x).hide(0)
}

//hide update quiz-lesson
function quiz_update_x_button(x){
    $("#show_update_quiz_p1"+x).hide(0)
}

//show update lesson
function lesson_show_update_x_button(x){
        $("#show_update_lesson"+x).show(0)
}

//show update quiz-lesson
function quiz_show_update_x_button(x){
    $("#show_update_quiz_p1"+x).show(0)
}

//show update chapter
function show_update_chapter_button(x){
        $("#show_update_chapter"+x).show(0)
}

//hide update chapter
function chapter_hide_update_button(x){
        $("#show_update_chapter"+x).hide(0)
}





//preview video befor upload
function loadVideo(event, i) {
    //$("#show_add_new_lesson"+i).hide(300)
        var x = URL.createObjectURL(event.target.files[0]);
        $("#lesson_video"+i).attr("src", x);
        $("#lesson_video"+i).show(0);

        console.log(event);
}
//show video option lesson


//preview update video befor upload
function updateVideo(event, i) {
    //$("#show_add_new_lesson"+i).hide(300)
        var x = URL.createObjectURL(event.target.files[0]);
        $("#lesson_video"+i).attr("src", x);
        $("#lesson_video"+i).show(0);

        console.log(event);
}
//show update video option lesson


//////////////circuit buttons///////////////////////////////////////////////
        $(document).ready(function() {
            $("#button_b2_req").click(function() {
                $("#requirement_id").show(300)
                $("#outcomes_id").hide(0)
                $("#finish_id").hide(0)
                $("#button_b2_req").css({
                    "background-color": "#ff8860",
                    "border-color": "#ff8860",
                    "color": "white"
                })
                $("#button_b3_req").css({
                    "background-color": "#6568f3",
                    "border-color": "#6568f3",
                    "color": "white"
                })
                $("#button_b5_req").css({
                    "background-color": "#6568f3",
                    "border-color": "#6568f3",
                    "color": "white"
                })

            });

        });

        $(document).ready(function() {
            $("#button_b3_req").click(function() {
                $("#requirement_id").hide(0)
                $("#finish_id").hide(0)
                $("#outcomes_id").show(300)
                $("#button_b3_req").css({
                    "background-color": "#ff8860",
                    "border-color": "#ff8860",
                    "color": "white"
                })
                $("#button_b2_req").css({
                    "background-color": "#6568f3",
                    "border-color": "#6568f3",
                    "color": "white"
                })
                $("#button_b5_req").css({
                    "background-color": "#6568f3",
                    "border-color": "#6568f3",
                    "color": "white"
                })

            });

        });

        $(document).ready(function() {
            $("#button_b5_req").click(function() {
                $("#finish_id").show(300)
                $("#outcomes_id").hide(0)
                $("#requirement_id").hide(0)
                $("#button_b3_req").css({
                    "background-color": "#6568f3",
                    "border-color": "#6568f3",
                    "color": "white"
                })
                $("#button_b2_req").css({
                    "background-color": "#6568f3",
                    "border-color": "#6568f3",
                    "color": "white"
                })
                $("#button_b5_req").css({
                    "background-color": "#ff8860",
                    "border-color": "#ff8860",
                    "color": "white"
                })

            });

        });


//////////////////////////////////////////////////////////////