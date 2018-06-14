Vue.component('app-join', {
    template: `
        <section class="app-join padding_05_1 flex_h-center">
            <div class="join-prefix bold font15 padding_0_1 v-align-center">#</div>
            <input autocorrect="off" 
                    autocapitalize="off" 
                    name="search" 
                    type="text" 
                    aria-label="Enter event code" 
                    placeholder="Enter event code" 
                    autocomplete="off" 
                    autofocus />
            <a href="#" class="primary join-button v-align-center h-align-center">
                Join
            </a>
        </section>
    `,
    data: function () {
        return {

        }
    }
});
