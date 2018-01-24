$(document).ready(function () {

    var options = {
      valueNames: [ 'title', 'startdate', {data: ['new']} ]
    };

    var userList = new List('titles', options);

    $("#filter-new").click(function() {
        if (userList.filtered) {
            userList.filter();
            $(this).text('New titles');
        } else {
            userList.filter(function(item) {
                if (item.values().new == 'yes') {
                   return true;
                } else {
                   return false;
                }
            });
            $(this).text('All titles');
        }
    });

    function updateSelected() {
        var numSelected = $(".selected").length;
        if (numSelected == 0) {
            $("#num-selected").text("No");
            $("#trove-search").prop("disabled", true);
        } else {
            $("#num-selected").text(numSelected);
            $("#trove-search").prop("disabled", false);
        }
    }

    $("img").error(function(){
        $(this).hide();
    });

    $(".list-group-item").click(function() {
        $(this).toggleClass("selected");
        updateSelected();
    });

    $(".list-group-item a").click(function(e) {
   //do something
        e.stopPropagation();
    });

    $("#trove-search").click(function() {
        var ids = [];
        $(".selected").each(function() {
            ids.push($(this).data("id"));
        });
        var keywords = $("#keywords").val();
        if (keywords !== "") {
            var params = ids.join("%22+OR+%22");
            var url = "http://trove.nla.gov.au/article/result?q=" + keywords + "+AND+(%22" + params + "%22)&l-format=Article";
            window.location.href = url;
        }
    });
    $("#clear").click(function() {
        $("#keywords").val("");
        $(".selected").toggleClass("selected");
        updateSelected();
    });
});
