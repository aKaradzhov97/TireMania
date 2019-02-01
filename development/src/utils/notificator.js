import $ from 'jquery';

$(() => {
    let loading = 0;
    $(document).on({
        ajaxStart: () => {
            if (!loading) $('#loadingBox').fadeIn();
            loading++;
            $('#errorBox').fadeOut();
            //Now lets hide the menu, if it is displayed.
            $("#main-nav-toggle").prop("checked", false);
        },
        ajaxStop: () => setTimeout(() => {
            loading--;
            if (!loading) $('#loadingBox').fadeOut();
        }, 500)
    });

    $('#infoBox').click((event) => $(event.target).fadeOut());
    $('#errorBox').click((event) => $(event.target).fadeOut());
});

function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.empty();
    infoBox.append('<i class="fas fa-check-circle"></i> ');
    infoBox.append(message);
    infoBox.show();
    setTimeout(() => infoBox.fadeOut(), 3000);
    //Now lets hide the menu, if it is displayed.
    $("#main-nav-toggle").prop("checked", false);
}

function showError(message) {
    let errorBox = $('#errorBox');
    errorBox.empty();
    errorBox.append('<i class="fas fa-times-circle"></i> ');
    errorBox.append(message);
    errorBox.show();
    //Now lets hide the menu, if it is displayed.
    $("#main-nav-toggle").prop("checked", false);
}

function handleError(reason) {
    showError(reason.responseJSON.description);
}

export default {
    handleError,
    showInfo,
    showError,
};