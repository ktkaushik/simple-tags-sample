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
        if (event.which === 13 || event.which === 9) {
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

        // backspace
        if (event.which === 8) {
            console.log('you pressed backspace');
            // for the first backspace - choose the last element to be removed. we can target it by hightlighting the tag
            // then on the second press delete it.

            // this task can be divided among a dew steps - 
            // 1. The user will use backspace not just to delete the element but to also edit teh content from teh current tag input box.
            //    so, this would mean we will have to check if the value of the current text box is empty. If so, move to the next step or END
            // 
            // mission - HIGHLIGHT / SELECT THE LAST TAG
            // 2. Use a simple jQuery selector which would basically pick the last element in the DOM with class ame as 'simple-tag'.
            //    But, in a case where there are multiple tags used in the page. We will need to be able to target using a particular SCOPE.
            //    Use the this.$input's siblings with simple-tag to find the element. Simple as that. 
            // 3. Check if class name 'tag-select' is present on the last tag which has been selected, if it is then go to step 4. If not, then add the class.
            // 4. Remove the element

            if ($(event.target).val() === '') {
                var $tagToBeDeleted = $(event.target).siblings('.simple-tag:last');
                $tagToBeDeleted.hasClass('tag-select') ? $tagToBeDeleted.remove() : $tagToBeDeleted.addClass('tag-select');
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