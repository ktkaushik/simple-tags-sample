(function ($) {


    $.fn.tags = function (opts) {
        var $this = $(this);
        var a = "<div class='simple-tags-block'> <input type='text' class='simple-tag-input' placeholder='add tags'> </div>";
        $this.css('display', 'none');
        $(a).insertAfter(this); // create our own div
        $input = $this.siblings().find('.simple-tag-input'); // jQuery instance of the div
        var tag = new Tag($this, $input, opts); // instantiate the instance
    };

    var Tag = function ($el, $input, opts) {
        this.$el = $el;
        this.$input = $input;
        this.opts = opts;

        // bind events
        this.$input.keydown(function (event) {
            this.keyDown(event);
        }.bind(this));
    }

    Tag.prototype.keyDown = function (event) {

        // if the key pressed is Enter or Tab
        if (event.which == 13 || event.which == 9) {
            event.preventDefault();
            if ($(event.target).val() !== '') {
                if (this.$el.val().length > 0) {
                    var val = this.$el.val()
                      , values = val.split(',');

                    values[values.length] = $(event.target).val();
                    this.$el.val(values.join(','));
                } else {
                    this.$el.val($(event.target).val());
                }
                this.createTag(event);
            }
        }
    };

    Tag.prototype.createTag = function (event) {

        var $element = $(event.target)
          , el = "<span class='simple-tag'>" + $element.val() + "</span>";

        $(el).insertBefore(this.$input);
        this.$input.val('');
    };

})(jQuery);