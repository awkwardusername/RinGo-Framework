/**
 * Created with IntelliJ IDEA.
 * User: hoshi~
 * Date: 3/30/13
 * Time: 11:49 PM
 * To change this template use File | Settings | File Templates.
 */

var RinGoInstance = function() {
    /* ======
     * Fields
     * ======
     */

    var enabled = true;

    var scroller = null;

    var viewport = null;

    var date = Number(new Date()); // TODO fetch date from server.

    /* ===============
     * Private Methods
     * ===============
     */

    var clearDateScroller = function() {
        for(var n = scroller.firstChild; n != null; n = n.nextSibling)
            if(n.nodeType == Node.ELEMENT_NODE) {
                scroller.removeChild(n);
                n = scroller.firstChild;
            }
    };

    var showDateScrollerDates = function() {
        var year = document.createElement("span");
        year.setAttribute("id", "year");
        year.setAttribute("class", "year");

        year.appendChild(document.createTextNode(new Date(date).getFullYear()));
        scroller.appendChild(year);

        var dates = document.createElement("ul");
        dates.setAttribute("id", "dates");
        dates.setAttribute("class", "dates");

        with(_date = new Date(date)) {
            for(var i = -3; i <= 3; i++) {
                // date element
                var d = document.createElement("li");
                var dateId = "date" + (i < 0? "" : "+") + i;
                var offset = new Date(
                    _date.getFullYear(),
                    _date.getMonth(),
                    _date.getDate() + i,
                    0,
                    0,
                    0
                );

                d.setAttribute("class", dateId);
                d.setAttribute("id", dateId);

                // day text
                var dy = document.createElement("span");
                dy.setAttribute("class", "day");
                var dy_t = document.createTextNode(offset.getDate());
                dy.appendChild(dy_t);

                with(monthNames = [
                    "Jan", "Feb", "Mar",
                    "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep",
                    "Oct", "Nov", "Dec"
                ]) {
                    // month text
                    var mnth = document.createElement("span");
                    mnth.setAttribute("class", "month");
                    var mnth_t = document.createTextNode(monthNames[offset.getMonth()]);
                    mnth.appendChild(mnth_t);

                    d.appendChild(dy);
                    d.appendChild(mnth);
                }

                dates.appendChild(d);
            }

            scroller.appendChild(dates);
        }
    };

    var doRepaint = function() {
        clearDateScroller();
        showDateScrollerDates();
    };

    var setDate = function(d) {
        date = d;
        doRepaint();
    }

    return {
        /* ==============
         * Public Methods
         * ==============
         */

        /**
         * Attach the current instance to components.
         * @param s the scroller object
         * @param v the viewport object
         * @param r should the attached components be repainted?
         */
        attach: function(s, v, r) {
            scroller = (typeof(s) == "string"? document.getElementById(s) : s);
            viewport = (typeof(v) == "string"? document.getElementById(v) : v);

            if(r !== undefined && r == true)
                this.repaint();
        },

        /**
         * Detach the currently attached components.
         */
        detach: function() {
            this.attach(null, null);
        },

        /**
         * Is the current instance enabled?
         * @return {boolean} Is the current instance enabled?
         */
        isEnabled: function() {
            return enabled;
        },

        /**
         * Sets the current instance enabled status.
         * @param b the enabled status: true to enable, false to disable.
         */
        setEnabled: function(b) {
            enabled = Boolean(b);
        },

        /**
         * Gets the current selected date of the instance.
         * @return {Date} The current selected date.
         */
        getDate: function() {
            return new Date(date);
        },

        offset: function(o) {
            setDate(date + o)
        },

        repaint: function() {
            doRepaint();
        }
    };
};

var RinGo = new RinGoInstance();
