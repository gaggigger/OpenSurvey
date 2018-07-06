const R_DASHBOARD_EVENT_LIST = Vue.component('app-dashboard-event-item', {
    template: `
        <section class="padding_top_3">
            <header class="surface">
                <h2 class="flex_h-center">
                    #{{ item.name }}
                </h2>
                <div>
                    <div class="font08 flex_h-center">
                        <i>Event will be available between these dates</i>
                    </div>
                    <div class="flex_wrap flex_h-center">
                        <span class="nowrap">
                            <b>from</b>
                            <input
                                type="datetime-local" 
                                v-model="datestart" 
                                name="datestart" />
                        </span>
                        <span class="nowrap">
                            <b>to</b>
                            <input 
                                type="datetime-local" 
                                v-model="dateend" 
                                name="dateend" />
                        </span>
                    </div>
                    <div>&nbsp;</div>
                </div>
            </header>
            <div class="flex_h-center flex_wrap margin_1_0 dash-item-container">
                
                <div role="button" tabindex="0" class="margin_1 pointer">
                    <div class="flex_h-center">
                        <div class="square_120 border-width_4 border-radius_50 background-hover bg-center bg-norepeat dash-quiz"></div>
                    </div>
                    <div class="h-align-center"> 
                        <h4>Quiz</h4>
                        <div class="font08">
                            Test, rank  your audience and nominate the winner
                        </div>
                    </div>
                </div>

                <div role="button" tabindex="0" class="margin_1 pointer">
                    <div class="flex_h-center">
                        <div class="square_120 border-width_4 border-radius_50 background-hover bg-center bg-norepeat dash-qa"></div>
                    </div>
                    <div class="h-align-center"> 
                        <h4>Q&A</h4>
                        <div class="font08">
                            Give your audience the opportunity to ask questions
                        </div>
                    </div>
                </div>

                <div role="button" tabindex="0" class="margin_1 pointer">
                    <div class="flex_h-center">
                        <div class="square_120 border-width_4 border-radius_50 background-hover bg-center bg-norepeat dash-polling"></div>
                    </div>
                    <div class="h-align-center"> 
                        <h4>Polling</h4>
                        <div class="font08">
                            Poll your audience in real-time
                        </div>
                    </div>
                </div>
                
                <div role="button" tabindex="0" class="margin_1 pointer">
                    <div class="flex_h-center">
                        <div class="square_120 border-width_4 border-radius_50 background-hover bg-center bg-norepeat dash-whiteboard"></div>
                    </div>
                    <div class="h-align-center"> 
                        <h4>White board</h4>
                        <div class="font08">
                            Share your code in real-time
                        </div>
                    </div>
                </div>
                                
            </div>
        </section>
    `,
    props: {
        event: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            item: {},
            datestart: '',
            dateend: ''
        };
    },
    created: function() {
        this.get();
    },
    methods: {
        get: function() {
            const http = new Http();
            http.send('/event/' + this.event, 'GET').then((response) => {
                this.item = response;
            }).catch(function(err) {
                // raf
            });
        }
    }
});
