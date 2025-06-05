import { Action, ActionPanel, closeMainWindow, Form, showHUD } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";
import { exec } from "child_process";

export default function ScheduleShutdown() {
    const handleSubmit = async (values: { timer: string }) => {
        const timer = values["timer"];

        console.log(timer);

        const command = `
            osascript -e 'on run argv
                delay (item 1 of argv)
                tell application "Finder"
                    make new Finder window
                end tell
            end run' ${values["timer"]}
        `;

        exec(command); // runs script in background

        await closeMainWindow({ clearRootSearch: true });

        await showHUD(`Scheduled Finder window in ${values["timer"]} minutes`);
    };

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm title="Schedule Timer" onSubmit={handleSubmit} />
                </ActionPanel>
            }
        >
            <Form.Dropdown id="timer" title="Timer">
                <Form.Dropdown.Item value="1" title="1 minutes" />

                <Form.Dropdown.Item value="15" title="15 minutes" />
                <Form.Dropdown.Item value="30" title="30 minutes" />
                <Form.Dropdown.Item value="45" title="45 minutes" />
                <Form.Dropdown.Item value="60" title="60 minutes" />
            </Form.Dropdown>
        </Form>
    );
}
