function reviewsInit(website) {
  $("#website").val(website);
  $(document).on("submit", "form", function(e) {
    e.preventDefault();
  });
  ("use strict");

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName("needs-validation");
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    $(document).on("submit", "form", function(e) {
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        postReview();
      }
      form.classList.add("was-validated");
    });
  });
  loadReviews();
  $("#reviewGroup > .btn").hover(
    function() {
      darkStars();
      $(this)
        .prevAll()
        .addClass("btn-warning")
        .find("i")
        .removeClass("text-secondary")
        .addClass("text-light");
      $(this)
        .find("i")
        .removeClass("text-secondary")
        .addClass("text-light");
    },
    function() {
      darkStars();
      lightStarts();
    }
  );

  $("#cancelForm").click(function(event) {
    event.preventDefault();
    $("#collapseForm").collapse("hide");
    refreshForm();
  });

  $("#reviewGroup > .btn").click(function() {
    $(this).trigger("blur");
    $(this)
      .prevAll()
      .addClass("btn-warning")
      .find("i")
      .removeClass("text-secondary")
      .addClass("text-light");
    $(this)
      .addClass("btn-warning")
      .find("i")
      .removeClass("text-secondary")
      .addClass("text-light");

    $("#inputRating").val($(this).data("id"));
    $("#collapseForm").collapse("show");
  });

  $("#ratingFilter > a").click(function() {
    var btn_txt =
      $(this).data("val") > 0 ? "Rated " + $(this).data("val") : "Filter";
    $("#filter_value").val($(this).data("val"));
    $("#dropdownMenuButton").text(btn_txt);
    clearReviews();
    loadReviews();
  });

  $(".progress-bar").hover(
    function() {
      $(this).removeClass("bg-secondary");
    },
    function() {
      $(this).addClass("bg-secondary");
    }
  );

  $(document).on("click", ".rev_vote", function() {
    var vtype = $(this).hasClass("fa-thumbs-up") ? 1 : 0;
    $.ajax({
      url: "api/postVote.php",
      type: "POST",
      dataType: "json",
      data: {
        type: vtype,
        review_id: $(this).data("id")
      },
      success: function(response) {
        Swal.fire({
          icon: "success",
          title: "Done",
          timer: 1000,
          showConfirmButton: false
        });
        clearReviews();
        loadReviews();
        $(this).focus();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  });

  $(document).on("click", ".rev_report", function() {
    Swal.fire({
      title: "What is wrong?",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: text => {
        var param_data = { report: text, review_id: $(this).data("id") };
        var params = new URLSearchParams();
        for (i in param_data) {
          params.append(i, param_data[i]);
        }
        return fetch("api/reportReview.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: params
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Thank you!",
          timer: 1000,
          showConfirmButton: false
        });
      }
    });
  });

  $(document).on("click", ".fbShare", function() {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent("https://www.upwork.com/"),
      "facebook-share-dialog",
      "width=626,height=436"
    );
    return false;
  });

  $(document).on("click", ".twShare", function() {
    window.open(
      "https://twitter.com/share?text=[Some Tweet Text Here]&amp;url=https://www.upwork.com/",
      "Twitter-dialog",
      "width=626,height=436"
    );
    return false;
  });
}

function postReview() {
  clearReviews();
  $.ajax({
    url: "api/postReview.php",
    type: "POST",
    dataType: "json",
    data: {
      inputName: $("#inputName").val(),
      inputEmail: $("#inputEmail").val(),
      formControlTextarea: $("#formControlTextarea").val(),
      inputRating: $("#inputRating").val(),
      website: $("#website").val()
    },
    success: function(response) {
      refreshForm();
      loadReviews();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
}

function clearReviews() {
  $("#reviewList").html("");
}

function loadStats() {
  // var filter = $("#filter_value").val();
  var website = $("#website").val();
  $.ajax({
    method: "GET",
    url: "api/getStats.php?website=" + website
  }).done(function(data, status) {
    var totalReviews = 0;
    data.forEach(item => {
      totalReviews += parseInt(item.count);
    });
    data.forEach(item => {
      var revPercent = ((item.count / totalReviews) * 100).toFixed(0);
      $("#cum" + item.stars + "percent").html(revPercent + "&nbsp%");
      $("#cum" + item.stars + "progress").css("width", revPercent + "%");
    });
    $("#totalReviews").html(totalReviews);
  });
}

function loadReviews() {
  loadStats();
  var filter = $("#filter_value").val();
  var website = $("#website").val();
  $.ajax({
    method: "GET",
    url: "api/getReviews.php?filter=" + filter + "&website=" + website
  }).done(function(data, status) {
    data.forEach(item => addReview(item));
  });
}

function addReview(item) {
  var stars = parseInt(item.stars);
  var starHtml = "";

  for (var i = 0; i < 5; i++) {
    var content = "fas fa-star";
    if (i >= stars) {
      content = "far fa-star";
    }
    starHtml +=
      '<span class="float mr-1"><i class="text-warning ' +
      content +
      '"></i></span>';
  }
  $("#reviewList").append(
    '<div class="card my-2">\
    <div class="card-body py-0">\
    <li class="media my-4">\
        <img src="assets/user-default-grey.png" class="image_plc mr-3" alt="...">\
        <div class="media-body">\
          <h5 class="mt-0 mb-1"><span class="mr-2">' +
      item.name +
      "</span>\
      " +
      starHtml +
      "\
          </h5>\
          " +
      item.review +
      '\
        </div>\
        </li>\
        </div>\
        <div class="card-footer">\
<span class="text-success">+' +
      item.uvotes +
      '</span><span class="float mx-1"><a data-id="' +
      item.id +
      '" class="rev_vote text-secondary far fa-thumbs-up border p-1"></a></span>\
<span class="float mx-1"><a data-id="' +
      item.id +
      '" class="rev_vote text-secondary far fa-thumbs-down border p-1"></a></span><span class="text-danger">-' +
      item.dvotes +
      "</span>\
" +
      '<span class="ml-3 float mx-1"><a alt="Share on Facebook" class="fbShare"><i class="text-secondary fab fa-facebook"></i></a></span>' +
      '<span class="float mx-1"><a alt="Share on twitter" class="twShare"><i class="text-secondary fab fa-twitter"></i></a></span>' +
      '<span class="float float-right"><a data-id="' +
      item.id +
      '" class="rev_report text-secondary far fa-flag ml-1"></a></span>\
</span></div>\
</div>'
  );
}
function darkStars() {
  $("#reviewGroup > .btn")
    .siblings()
    .removeClass("btn-warning")
    .find("i")
    .addClass("text-secondary")
    .removeClass("text-light");
}

function lightStarts() {
  $("#reviewGroup > .btn:lt(" + $("#inputRating").val() + ")")
    .addClass("btn-warning")
    .find("i")
    .removeClass("text-secondary")
    .addClass("text-light");
}

function refreshForm() {
  darkStars();
  $("#formControlTextarea").val("");
  $("#inputName").val("");
  $("#inputEmail").val("");
  $("#inputRating").val(0);
  $("form").removeClass("was-validated");
}
