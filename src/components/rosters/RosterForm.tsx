'use client';
import { useShortRosterList } from '@/src/hooks/useRostersList';
import { Army, defaultArmyFactions } from '@/src/lib/army';
import { armyDetachments } from '@/src/lib/detachments';
import { kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import FormInput from '../common/inputs/FormInput';
import FormSelect, { FormSelectOption } from '../common/inputs/FormSelect';
import FormSelectList from '../common/inputs/FormSelectList';
import DetachmentCard from './DetachmentCard';

export interface RosterFormProps {
  id?: string;
  defaultValues?: RosterFormInput;
}

export const rosterFormSchema = z.object({
  name: z.string().min(1, 'Roster name is required').max(255, 'Roster name is too long'),
  army: z.enum(Army, 'Army is required'),
  points: z.coerce
    .number()
    .min(0, 'Points must be greater than 0')
    .max(1_000_000, 'Points must be less than 1,000,000'),
  detachmentName: z
    .string()
    .min(1, 'Detachment name is required')
    .max(255, 'Detachment name is too long'),
});

export type RosterFormInput = z.input<typeof rosterFormSchema>;
export type RosterFormOutput = z.infer<typeof rosterFormSchema>;

const armyOptions: FormSelectOption[] = Object.values(Army).map((a) => ({
  label: kebabCaseToTitleCase(a),
  value: a,
}));

const pointsOptions: FormSelectOption[] = [
  { label: 'Mini Incursion - 500 Points', value: '500' },
  { label: 'Incursion - 1000 Points', value: '1000' },
  { label: 'Mini Strike Force - 1500 Points', value: '1500' },
  { label: 'Strike Force - 2000 Points', value: '2000' },
  { label: 'Onslaught - 3000 Points', value: '3000' },
];

export default function RosterForm({ id, defaultValues }: RosterFormProps) {
  const shortRosterList = useShortRosterList();
  const router = useRouter();

  const [detachmentOptions, setDetachmentOptions] = useState<FormSelectOption[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RosterFormInput>({
    resolver: zodResolver(rosterFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<RosterFormOutput> = (data) => {
    const rosterId = id ?? uuidv4();
    if (id) {
      shortRosterList.updateRoster(rosterId, { id: rosterId, ...data });
    } else {
      shortRosterList.addRoster({ id: rosterId, ...data });
    }
    router.push(`/rosters/details?rosterId=${encodeURIComponent(rosterId)}`);
  };

  const handleArmyChange = useCallback(
    (value: Army) => {
      const detachments = value
        ? armyDetachments[value].map((detachment) => ({
            label: (
              <DetachmentCard
                name="detachment"
                detachment={detachment}
                defaultArmyFaction={defaultArmyFactions[value]}
              />
            ),
            value: detachment.slug,
          }))
        : [];
      setDetachmentOptions(detachments);
      setValue('detachmentName', detachments[0]?.value ?? '');
      trigger('detachmentName');
    },
    [setValue, trigger],
  );

  const registerArmy = useMemo(() => {
    const result = register('army');
    return {
      ...result,
      onChange: (value: ChangeEvent<HTMLSelectElement>) => {
        result.onChange(value);
        handleArmyChange(value.target.value as Army);
      },
    };
  }, [register, handleArmyChange]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<RosterFormInput>)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      <legend className="text-xl font-bold sm:col-span-full">Army</legend>
      <div className="col-span-full sm:col-span-1">
        <FormInput
          error={errors.name}
          autoComplete="name"
          placeholder="Enter a name for your roster"
          {...register('name')}
        />
      </div>
      <div className="col-span-full sm:col-span-1">
        <FormSelect
          emptyOptionLabel="Select an army"
          options={armyOptions}
          error={errors.army}
          {...registerArmy}
        />
      </div>
      <div className="col-span-full sm:col-span-1">
        <FormSelect
          // Default to Incursion - 1000 Points
          defaultValue={pointsOptions[1].value}
          options={pointsOptions}
          error={errors.points as FieldError}
          {...register('points')}
        />
      </div>
      <div className="col-span-full sm:col-span-3">
        <legend className="text-xl font-bold mb-2">Detachment</legend>
        <FormSelectList
          options={detachmentOptions}
          defaultValue={detachmentOptions[0]?.value}
          error={errors.detachmentName}
          emptyOptionLabel={
            detachmentOptions.length === 0 ? (
              <div className="btn w-full h-12 bg-base-300 justify-start">
                <h3 className="pl-10">Select an army first</h3>
              </div>
            ) : undefined
          }
          {...register('detachmentName')}
        />
      </div>
      <button type="submit" className="btn btn-primary col-span-full">
        Create
      </button>
    </form>
  );
}
