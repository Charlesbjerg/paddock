"use client";
import React from 'react'
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { SelectDrivers, SelectLapTimes, SelectPitStops } from '@/db/schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import SingleDriverLapTimes from '../charts/SingleDriverLapTimes';


type ResultsDialogProps = {
    driver: SelectDrivers;
    results: Array<SelectLapTimes>;
    pitStops: Array<SelectPitStops>;
}

export default function DriverResultsDialog({ driver, results, pitStops }: ResultsDialogProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button>View Results</Button>
                </DialogTrigger>
                <DialogContent className='max-w-7xl max-h-[80vh] overflow-auto'>
                    <DialogHeader>
                        <DialogTitle>Race Results for {driver.forename} {driver.surname}</DialogTitle>
                        <DialogDescription>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="lap-times">
                                    <AccordionTrigger>Lap Times</AccordionTrigger>
                                    <AccordionContent>
                                        <SingleDriverLapTimes lapTimes={results} />
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="pit-stops">
                                    <AccordionTrigger>Pit Stops</AccordionTrigger>
                                    <AccordionContent>
                                        <div className='flex items-start gap-x-4'>
                                        {pitStops.map((pitStop, index) => (
                                            <div key={index} className='p-4 rounded border border-gray-800'>
                                                <p>{pitStop.stop}</p>
                                                <p>Lap {pitStop.lap}</p>
                                                <p>{pitStop.duration}</p>
                                            </div>
                                        ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
