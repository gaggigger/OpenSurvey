const R_DASHBOARD_EVENT = Vue.component('app-dashboard-event', {
    template: `
        <div class="page">
            <section>
                <app-dashboard-event-information :event="event"></app-dashboard-event-information>
                <div class="flex_h-center flex_wrap margin_1_0 dash-item-container">
                    
                    <md-card role="button" tabindex="0" class="margin_1">
                        <md-card-header class="flex_h-center pointer">
                            <div class="min-square-120 border-width_4 border-radius_50 background-hover bg-center bg-norepeat dash-quiz"
                             @click="goto('eventquiz')"></div>
                        </md-card-header>
                        <md-card-content class="h-align-center"> 
                            <h4 @click="goto('eventquiz')">Quiz</h4>
                            <div class="font08">
                                Test, rank  your audience and nominate the winner
                            </div>
                        </md-card-content>
                    </md-card>
    
                    <md-card role="button" tabindex="0" class="margin_1">
                        <md-card-header class="flex_h-center pointer">
                            <div class="min-square-120 border-width_4 border-radius_50 background-hover bg-center bg-norepeat dash-qa"
                             @click="goto('eventqa')"></div>
                        </md-card-header>
                        <md-card-content class="h-align-center"> 
                            <h4 @click="goto('eventqa')">Q&A</h4>
                            <div class="font08">
                                Give your audience the opportunity to ask questions
                            </div>
                        </md-card-content>
                    </md-card>
    
                    <md-card role="button" tabindex="0" class="margin_1">
                        <md-card-header class="flex_h-center pointer">
                            <div class="min-square-120 border-width_4 border-radius_50 background-hover bg-center bg-norepeat dash-polling"></div>
                        </md-card-header>
                        <md-card-content class="h-align-center"> 
                            <h4>Polling</h4>
                            <div class="font08">
                                Poll your audience in real-time
                            </div>
                        </md-card-content>
                    </md-card>
                    
                    <md-card role="button" tabindex="0" class="margin_1">
                        <md-card-header class="flex_h-center pointer">
                            <div class="min-square-120 border-width_4 border-radius_50 background-hover bg-center bg-norepeat dash-whiteboard"></div>
                        </md-card-header>
                        <md-card-content class="h-align-center"> 
                            <h4>White board</h4>
                            <div class="font08">
                                Share your text, code in real-time
                            </div>
                        </md-card-content>
                    </md-card>
                                    
                </div>
            </section>
        </div>
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
        SocketService.room(this.event);
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
