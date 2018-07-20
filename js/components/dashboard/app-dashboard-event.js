const R_DASHBOARD_EVENT = Vue.component('app-dashboard-event', {
    template: `
        <section class="padding_top_3">
            <header class="surface">
                <app-dashboard-event-information :event="event"></app-dashboard-event-information>
            </header>
            <div class="flex_h-center flex_wrap margin_1_0 dash-item-container">
                
                <div role="button" tabindex="0" class="margin_1 pointer" @click="goto('eventquiz')">
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

                <div role="button" tabindex="0" class="margin_1 pointer"@click="goto('eventqa')">
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
                            Share your text, code in real-time
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
    data() {
        return {
            item: {}
        };
    },
    created() {
        this.get();
    },
    methods: {
        get() {
            EventService.get(this.event).then(response => {
                // raf?
            });
        },
        goto(name) {
            this.$router.push({
                name: name,
                params: { event: this.event }
            });
        }
    }
});
