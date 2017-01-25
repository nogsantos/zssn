/**
 * App configurations
 * @todo Must be generated on build
 * 
 * @author Fabricio Nogueira
 */
export default {
    api: {
        address: "http://zssn-backend-example.herokuapp.com/api/",
        resources: {
            survivor: "people",
            inventary: "properties",
            report: "report_infection"
        },
        key: "AIzaSyDVM7xQFkBSFFp9RhKcEeStD_hYkMHWwyw"
    },
    conf: {
        messages: {
            error: {
                duration: 9000
            },
            success: {
                duration: 6000
            },
            warn: {
                duration: 6000
            },
            info: {
                duration: 6000
            },
            help: {
                duration: 9000
            }
        },
        storage: {
            name: "survivor"
        }
    }
};
